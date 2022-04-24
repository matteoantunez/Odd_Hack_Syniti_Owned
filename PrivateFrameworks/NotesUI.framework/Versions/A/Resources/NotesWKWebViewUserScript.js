var notewkwebview = {};
var editor = document.getElementById("editor");
const FIRST_LINE_ONLY = 0x0FFFFFFF;
const LONG_PRESS_MILLISECONDS = 500;

var enableAttachments = true;

function setEnableAttachments(enabled) {
    enableAttachments = enabled;
}

// Add a DOM mutation observer to the editor to listen for nodes being added
new MutationObserver(function(mutationsList, observer) {
    for (let mutation of mutationsList) {
        
        // if any nodes have been added in this mutation, recursively collect all unsupported nodes
        for (let node of mutation.addedNodes) {
            let unsupportedNodes = [];
            collectUnsupportedNodes(node, unsupportedNodes);

            // and remove them from the DOM
            for (let node of unsupportedNodes) {
                if (node.parentNode) {
                    node.parentNode.removeChild(node);
                }
            }
        }
    }

    // ensure attachment listeners are up to date for any newly added attachments
    addAttachmentListeners();
}).observe(editor, { childList: true, subtree: true });

// Recursively collects all unsupported nodes under the given node
function collectUnsupportedNodes(node, unsupportedNodes) {

    // first decide if the node itself is supported
    let isSupported = true;
    if (node.nodeType === Node.ELEMENT_NODE) {

        // only image and attachment tags are potentially unsupported
        const tagName = node.tagName.toLowerCase();
        if (['img', 'attachment'].includes(tagName)) {

            // by default, nodes are supported as long as a source is present
            let source = node.getAttribute('src');
            isSupported = !!source;

            // when attachments are disabled, don't allow any images or attachments
            if (!enableAttachments) {
                isSupported = false;
            }
        }
    }
    
    // if this element is unsupported, add it to the list
    if (!isSupported) {
        unsupportedNodes.push(node);
    }

    // otherwise we'll recurse to any child nodes
    else {
        for (var childNode of node.childNodes) {
            collectUnsupportedNodes(childNode, unsupportedNodes);
        }
    }
}

function isBreakingTag(node) {
    switch (node.nodeName.toUpperCase()) {
        case "P":
        case "BR":
        case "DIV":
            return true;
        default:
            return false;
    }
}

function isSeparatingTag(node) {
    switch (node.nodeName.toUpperCase()) {
        case "IMG":
        case "OBJECT":
            return true;
        default:
            return false;
    }
}

function appendTextContentsOfNode(node, maxLength, skipFirstLine, baseString) {
    var endsInWhitespace = /\s$/;
    var endsInNewline = /\n$/;
    var result = baseString;
    var keepGoing = true;
    //var nbsp[3] = "\xc2\xa0\x00";
    if (node.nodeType == Node.TEXT_NODE) {
        // For text nodes, append the contents to the result, inserting a space if needed
        var textValue = node.nodeValue;
        if (textValue.trim().length > 0) {
            result = result + textValue;
        } else if (result.length > 0 && !endsInWhitespace.test(result)) {
            result = result + " ";
        }
    } else {
        // We ignore any leading breaking tags.  This does mean that a note can start with any amount of white space
        // and we'll simply skip over it.
        if (result.length > 0 && isBreakingTag(node)) {
            if (maxLength == FIRST_LINE_ONLY) {
                // If we've seen some content and now encounter a break, we're done.
                if (result.trim().length > 0) {
                    keepGoing = false;
                }
            } else if (skipFirstLine) {
                // If we've already seen some text and now reach a break but we're skipping the
                // first line then just reset the string to be empty and flip the flag so we won't do this again.
                // If the "first line" actually includes the second line because of whitespace, skip over that too
                if (result.trim().length > 0) {
                    result = "";
                    skipFirstLine = false;
                }
            } else if (!endsInNewline.test(result)) {
                result = result + "\n";
            }
        } else if (result.length > 0 && isSeparatingTag(node)) {
            result = result + " ";
        }
        
        if (!(node.nodeName.toUpperCase() === "STYLE")) {
            // Loop over our children and append their content if we should keep going
            var child = node.firstChild;
            while (child && keepGoing) {
                var resultDict = appendTextContentsOfNode(child, maxLength, skipFirstLine, result);
                result = resultDict.result;
                keepGoing = resultDict.keepGoing;
                
                if (keepGoing) {
                    var newLength = result.length;
                    if (newLength > maxLength) {
                        result = result.substring(0, maxLength - 1);
                        keepGoing = false;
                    }
                    child = child.nextSibling;
                }
            }
            
            // This handles a case where an existing tile is dropped to the 2nd line via return and text is prepended on the 1st line
            // The result is a string wrapped in a breaking tag followed by a floating string <div>New Title</div>Old Title
            // This fixes <rdar://problem/5357478> Notes title is incorrect after prepending a line
            if (result.length > 0 && isBreakingTag(node)) {
                keepGoing = false;
            }
        }
    }
    
    return { keepGoing: keepGoing, result: result };
}

function getFirstLine() {
    var firstLine = "";
    var skipFirstLine = false;
    var resultDict = appendTextContentsOfNode(document.body, FIRST_LINE_ONLY, skipFirstLine, firstLine);
    return resultDict.result.trim();
}

function hasOneOrMoreAttachments() {
    var hasAttachments = false;
    var imageElement = editor.querySelector("img");
    var attachmentElement = editor.querySelector("attachment");
    
    return (imageElement != null || attachmentElement != null);
}

function getHTMLContent() {
    var editorClone = editor.cloneNode(true);

    editorClone.querySelectorAll("img").forEach(image => {
        // if the image source is a cid reference, we'll convert it to an object tag
        var contentIDURL = image.getAttribute("src");
        if (contentIDURL.startsWith("cid:")) {
            var object = document.createElement("object");
            object.setAttribute("type", "application/x-apple-msg-attachment");
            object.setAttribute("data", contentIDURL);
            image.replaceWith(object);
        }
    });
    editorClone.querySelectorAll("attachment").forEach(attachment => {
        var contentIDURL = attachment.getAttribute("file");
        var object = document.createElement("object");
        object.setAttribute("type", "application/x-apple-msg-attachment");
        object.setAttribute("data", contentIDURL);
        attachment.replaceWith(object);
    });
    
    // In general we're only interested in the content inside the body tag. We don't want to save our custom CSS from the head tag, for example.
    var htmlNode = document.createElement("html");
    var headNode = document.createElement("head");
    var bodyNode = document.createElement("body");
    htmlNode.appendChild(headNode);
    htmlNode.appendChild(bodyNode);
    bodyNode.innerHTML = editorClone.innerHTML;
    // Special exception to save the style attribute from the body tag because font size information can get stored there when applied to the whole document.
    var bodyStyle = editorClone.getAttribute("style");
    if (bodyStyle != null) {
        bodyNode.setAttribute("style", bodyStyle);
    }

    return htmlNode.outerHTML;
}

function getAttachmentContentIDURLs() {
    var contentIDURLs = [];
    document.querySelectorAll("img, attachment, object").forEach(object => {
        var contentIDURL = object.getAttribute("src");
        if (!contentIDURL) {
            contentIDURL = object.getAttribute("file");
        }
        if (!contentIDURL) {
            contentIDURL = object.getAttribute("data");
        }
        if (contentIDURL) {
            contentIDURLs.push(contentIDURL);
        }
    });
    
    return contentIDURLs;
}

function getHTMLContentAndAttachmentContentIDURLs() {
    var resultDict = {};
    resultDict["attachmentContentIDURLs"] = getAttachmentContentIDURLs();
    resultDict["htmlContent"] = getHTMLContent();
    
    return resultDict;
}

function addAttachmentListeners() {
    document.querySelectorAll("img, attachment, object").forEach(element => {

        // when pressing on these tags we need to avoid focus
        element.addEventListener("touchstart", notewkwebview.disableEditor);
        element.addEventListener("touchend", notewkwebview.enableEditor);
        element.addEventListener("touchmove", notewkwebview.enableEditor);
        element.addEventListener("touchcancel", notewkwebview.enableEditor);
        
        var contentIDURL = null;
        if (element.tagName.toLowerCase() == "attachment") {
            contentIDURL = element.getAttribute("file");
        } else if (element.tagName.toLowerCase() == "img") {
            contentIDURL = element.src;
        }
        if (contentIDURL != null) {
            element.addEventListener("onclick", function() {
                window.webkit.messageHandlers.clickedAttachment.postMessage(contentIDURL);
            }, false);
            element.addEventListener("dblclick", function() {
                window.webkit.messageHandlers.doubleClickedAttachment.postMessage(contentIDURL);
            }, false);
        }
    });
}

function addImageAndAttachmentTags(attachmentInfoDict) {
    document.querySelectorAll("object").forEach(object => {
        while (object.hasChildNodes()) {
            object.removeChild(object.lastChild);
        }
        var contentIDURL = object.getAttribute("data");
        var attachmentInfo = attachmentInfoDict[contentIDURL];
        if (attachmentInfo) {
            if (attachmentInfo["image"] == true) {
                var image = document.createElement("img");
                image.src = object.getAttribute("data");

                object.replaceWith(image);
            } else {
                var attachment = document.createElement("attachment");
                attachment.title = attachmentInfo["title"];
                attachment.setAttribute("subtitle", attachmentInfo["subtitle"]);
                attachment.setAttribute("type", attachmentInfo["type"]);
                attachment.setAttribute("file", object.getAttribute("data"));
                attachment.setAttribute("src", object.getAttribute("data"));
                attachment.setAttribute("id", object.getAttribute("data"));
                object.replaceWith(attachment);
            }
        }
    });

    addAttachmentListeners();
}

function htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}

function replaceSelectedTextWithNode(replacementNode) {
    var sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(replacementNode);
        } else {
            editor.appendChild(replacementNode);
        }
    } else if (document.selection && document.selection.createRange) {
        sel = document.selection;
        range = sel.createRange();
        range.insertNode(replacementNode);
    }
    
    if (range) {
        //move the selection after inserted node
        range.setStartAfter(replacementNode);
        range.setEndAfter(replacementNode);
        sel.removeAllRanges();
        sel.addRange(range);
    }
}

function setElementContentID(element, newContentID) {
    element.setAttribute('src', newContentID);
    if (element.tagName.toLowerCase() == 'attachment') {
        element.setAttribute('file', newContentID);
        element.setAttribute('id', newContentID);
    }
}

notewkwebview.copyNoteHTMLToPasteboard = function() {
    var range = document.createRange();
    range.selectNode(document.body);
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
}

notewkwebview.getSelectionRects = function() {
    var selection = document.getSelection();
    var rectArray = [];
    var i;
    for (i = 0; i < selection.rangeCount; i++) {
        var range = selection.getRangeAt(i);
        var clientRect = range.getBoundingClientRect();
        rectArray.push([clientRect.left, clientRect.bottom, clientRect.width, clientRect.height]);
    }

    return rectArray;
}

// Set the HTML content. The second parameter is a dictionary mapping attachment content ID URLs to an info dictionary that is used to transform object tags to either img or attachment tags for viewing.
notewkwebview.setHTMLContentWithAttachmentInfos = function(text, imageContentIDURLs) {
    var tempHtmlNode = document.createElement("html");
    tempHtmlNode.innerHTML = text;
    var tempEditor = tempHtmlNode.querySelector("body");
    editor.innerHTML = tempEditor.innerHTML;
    // Restore the style attribute on the body tag because size information can get stored there when applied to the whole document.
    var newStyle = tempEditor.getAttribute("style");
    if (newStyle != null) {
        editor.setAttribute("style", newStyle);
    } else {
        editor.removeAttribute("style");
    }
    addImageAndAttachmentTags(imageContentIDURLs);
    window.webkit.messageHandlers.titleDidChange.postMessage(getFirstLine());
}

notewkwebview.insertHTML = function(html) {
    var elements = htmlToElements(html);
    for (element of elements) {
        replaceSelectedTextWithNode(element);
    }
    window.webkit.messageHandlers.titleDidChange.postMessage(getFirstLine());
    window.webkit.messageHandlers.textDidChange.postMessage(null);
}

notewkwebview.insertLink = function(href, title) {
    notewkwebview.insertLinks([href], [title]);
}

notewkwebview.insertLinks = function(hrefs, titles) {
    for (i = 0; i < hrefs.length && i < titles.length; i++) {
        if (i > 0) {
            var linebreak = document.createElement("br");
            replaceSelectedTextWithNode(linebreak);
        }

        var href = hrefs[i];
        var title = titles[i];
        var anchor = document.createElement("a");
        anchor.href = href;
        anchor.appendChild(document.createTextNode(title));
        replaceSelectedTextWithNode(anchor);
    }
    window.webkit.messageHandlers.titleDidChange.postMessage(getFirstLine());
    window.webkit.messageHandlers.textDidChange.postMessage(null);
}

notewkwebview.insertAttachment = function(attachmentInfo) {
    if (attachmentInfo) {
        var contentIDURL = attachmentInfo["contentIDURL"];
        if (attachmentInfo["image"] == true) {
            var image = document.createElement("img");
            image.src = contentIDURL;
            replaceSelectedTextWithNode(image);
        } else {
            var attachment = document.createElement("attachment");
            attachment.title = attachmentInfo["title"];
            attachment.setAttribute("subtitle", attachmentInfo["subtitle"]);
            attachment.setAttribute("type", attachmentInfo["type"]);
            attachment.setAttribute("file", contentIDURL);
            attachment.setAttribute("src", contentIDURL);
            attachment.setAttribute("id", contentIDURL);
            replaceSelectedTextWithNode(attachment);
        }
        window.webkit.messageHandlers.titleDidChange.postMessage(getFirstLine());
        window.webkit.messageHandlers.attachmentsDidChange.postMessage(hasOneOrMoreAttachments());
        window.webkit.messageHandlers.textDidChange.postMessage(null);

        addAttachmentListeners();
    }
}

notewkwebview.insertAttachments = function(attachmentInfos) {
    if (attachmentInfos.length > 0) {
        const iterator = attachmentInfos.values();
        
        for (const attachmentInfo of iterator) {
            const contentIDURL = attachmentInfo["contentIDURL"];
            if (attachmentInfo["image"] == true) {
                const image = document.createElement("img");
                image.src = contentIDURL;
                replaceSelectedTextWithNode(image);
            } else {
                const attachment = document.createElement("attachment");
                attachment.title = attachmentInfo["title"];
                attachment.setAttribute("subtitle", attachmentInfo["subtitle"]);
                attachment.setAttribute("type", attachmentInfo["type"]);
                attachment.setAttribute("file", contentIDURL);
                attachment.setAttribute("src", contentIDURL);
                attachment.setAttribute("id", contentIDURL);
                replaceSelectedTextWithNode(attachment);
            }
        }
        window.webkit.messageHandlers.titleDidChange.postMessage(getFirstLine());
        window.webkit.messageHandlers.attachmentsDidChange.postMessage(hasOneOrMoreAttachments());
        window.webkit.messageHandlers.textDidChange.postMessage(null);

        addAttachmentListeners();
    }
}

notewkwebview.removeAttachments = function(attachmentInfos) {
    if (attachmentInfos.length > 0) {
        const iterator = attachmentInfos.values();
        var contentIDURLsToRemove = [];
        var removedAttachment = false;
        
        for (const attachmentInfo of iterator) {
            const contentIDURL = attachmentInfo["contentIDURL"];
            if (contentIDURL) {
                contentIDURLsToRemove.push(contentIDURL);
            }
        }
        document.querySelectorAll("img, attachment, object").forEach(object => {
            var contentIDURL = object.getAttribute("src");
            if (!contentIDURL) {
                contentIDURL = object.getAttribute("file");
            }
            if (!contentIDURL) {
                contentIDURL = object.getAttribute("data");
            }
            if (contentIDURL && contentIDURLsToRemove.includes(contentIDURL)) {
                object.remove();
                removedAttachment = true;
            }
        });

        if (removedAttachment) {
            window.webkit.messageHandlers.titleDidChange.postMessage(getFirstLine());
            window.webkit.messageHandlers.attachmentsDidChange.postMessage(hasOneOrMoreAttachments());
            window.webkit.messageHandlers.textDidChange.postMessage(null);
        }
    }
}

notewkwebview.replaceAttachmentContentIDs = function(contentIDMapping) {
    var sendAttachmentContentIDs = false;
    for (const oldID in contentIDMapping) {
        var newContentID = contentIDMapping[oldID];
        
        // Find the first element with the old content id and swap it to the new content ID
        var element = document.querySelector('[src="' + oldID + '"], [file="' + oldID + '"]');
        if (element != null) {
            setElementContentID(element, newContentID);
        } else {
            var found = false;
            document.querySelectorAll("img").forEach(object => {
                if (object.attachmentIdentifier === oldID) {
                    setElementContentID(object, newContentID);
                    found = true;
                    sendAttachmentContentIDs = true;
                }
            });
            if (!found) {
                document.querySelectorAll("img").forEach(object => {
                    if (object.attachmentIdentifier === oldID) {
                        setElementContentID(object, newContentID);
                        sendAttachmentContentIDs = true;
                    }
                });
            }
        }
    }

    window.webkit.messageHandlers.textDidChange.postMessage(null);
}

notewkwebview.removeStyle = function() {
    document.execCommand("removeFormat");
    editor.removeAttribute("style");
}

notewkwebview.enableEditor = function() {
    editor.setAttribute("contentEditable", true);
    editor.style.userSelect = "auto";
}

notewkwebview.disableEditor = function() {
    editor.setAttribute("contentEditable", false);
    editor.style.userSelect = "none";
}

notewkwebview.startEditing = function() {
    editor.focus();
}

notewkwebview.stopEditing = function() {
    notewkwebview.updateAnchorListeners();
    editor.blur();
}

notewkwebview.scrollSelectionToVisible = function() {
    var node = document.getSelection().anchorNode;
    while (node != null && node.nodeType != Node.ELEMENT_NODE) {
        node = node.parentNode;
    }
    
    if (node != null) {
        node.scrollIntoView();
    }
}

notewkwebview.setSelectionToStart = function() {
    var selection = document.getSelection();
    selection.removeAllRanges();
    var range = document.createRange();
    range.collapse(true);
    selection.addRange(range);
}

notewkwebview.setSelectionToEnd = function() {
    var selection = document.getSelection();
    selection.removeAllRanges();
    var range = document.createRange();
    range.collapse(false);
    selection.addRange(range);
}

notewkwebview.setAccentColor = function(accentColor) {
    document.documentElement.style.setProperty('--accent-color', accentColor);
}

function getListStyle() {
    var list = _parentList();
    if (list && list.nodeName.toUpperCase() == "OL") {
        return '1';
    } else if (list && list.nodeName.toUpperCase() == "UL") {
        if (list.className == "Apple-dash-list") {
            return '-';
        } else {
            return '*';
        }
    }
    
    return ' ';
}

notewkwebview.insertBulletedList = function() {
    var list = _parentList();
    if (!list || list.nodeName.toUpperCase() != "UL" || list.className == "") {
        document.execCommand("insertUnorderedList");
        // the previous line will cause a selection change to fire
        // and the default unordered list style is already bullet
    } else {
        // if it's already an unordered list let's ensure it's bullet style
        // and inform the Objective C side of the change
        list = _parentList();
        list.className = "";
        postSelectionDidChangeMessage();
    }
}

notewkwebview.insertDashedList = function() {
    var list = _parentList();
    if (!list || list.nodeName.toUpperCase() != "UL" || list.className == "Apple-dash-list") {
        document.execCommand("insertUnorderedList");
    }
    list = _parentList();
    list.className = "Apple-dash-list";
    // we need to send the new list style over to the Objective C side after making it a dashed list
    postSelectionDidChangeMessage();
}

notewkwebview.insertNumberedList = function() {
    document.execCommand("insertOrderedList");
}

notewkwebview.updateAnchorListeners = function() {
    var anchors = document.getElementsByTagName("a");
    for (var anchor of anchors) {
        if (anchor.href.startsWith('x-apple-data-detectors')) {
            anchor.classList.add('Apple-detected');
        }

        // when pressing on anchor tags we need to avoid focus
        _avoidFocusForElement(anchor);
    }
}

onAnchorTouchEnd = function() {
    window.webkit.messageHandlers.anchorTouchesDidEnd.postMessage(null);
}

editor.addEventListener("blur", function() {
                        window.webkit.messageHandlers.editorDidBlur.postMessage(null);
                        }, false);
    
editor.addEventListener("input", function() {
                        window.webkit.messageHandlers.titleDidChange.postMessage(getFirstLine());
                        window.webkit.messageHandlers.attachmentsDidChange.postMessage(hasOneOrMoreAttachments());
                        window.webkit.messageHandlers.textDidChange.postMessage(null);
                        }, false)

document.addEventListener("selectionchange", function() {
    postSelectionDidChangeMessage();
}, false);

function postSelectionDidChangeMessage() {
    var sel = window.getSelection();
    var range = sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
    var selectionLength = -1;
    if (range) {
        selectionLength = range.toString().length;
    }
    var resultDict = {};
    resultDict["selectionLength"] = selectionLength;
    resultDict["listStyle"] = getListStyle();
    window.webkit.messageHandlers.selectionDidChange.postMessage(resultDict);
}

var enableSmartLists = true;

function setEnableSmartLists(enabled) {
    enableSmartLists = enabled;
}

var enableShiftNewlinesInSmartLists = false;

function setEnableShiftNewLinesInSmartLists(enabled) {
    enableShiftNewlinesInSmartLists = enabled;
}

document.onkeydown = interpretTabIndents;
document.onkeypress = interpretAutoformatSequence;

function interpretTabIndents(event) {
    var tabCharKeyCode = 9;
    var returnKeyCode = 13;
    
    if (event.keyCode == tabCharKeyCode) {
        if (_parentList()) {
            // Tab Indent/outdent - only supported if already inside a list
            if (event.shiftKey) {
                document.execCommand("outdent");
            } else {
                document.execCommand("indent");
            }
        } else {
            document.execCommand("insertHTML", true, "<span class='tab'>&#9;</span>");
        }
        return false;
    }
    
    // If we're hitting Shift + Enter or Return within an active list and we've enabled shift newlines
    // in our lists, then we'll insert a newline instead of allowing the editor to create a new list item
    if (event.keyCode == returnKeyCode && event.shiftKey && _parentList() && enableShiftNewlinesInSmartLists) {
        
        // insert a newline and zero-width non breaking space to allow the cursor to rest on the next line
        var selection = document.getSelection();
        var range = selection.getRangeAt(0);
        var breakNode = document.createTextNode("\n\ufeff");
        range.insertNode(breakNode);
        
        // now move the cursor to the next line
        var newRange = document.createRange();
        newRange.setStartAfter(breakNode);
        selection.removeAllRanges();
        selection.addRange(newRange);

        return false;
    }
    
    return true;
}

function interpretAutoformatSequence(event) {
    // smart lists must be enabled
    if (!enableSmartLists) return true;
    
    // we only want to check for substitutions on space characters, otherwise
    // the typing performance implications could be heavy
    if (event.keyCode != 32) return true;
    
    // we aren't going to do any list substitutions if we're already in a list
    if (_parentList()) return true;
    
    var rangeBeforeCursor = _rangeToInspect();
    if (rangeBeforeCursor) {
        var sequenceToTest = rangeBeforeCursor.toString() + " ";
        
        // regexp comments:
        // "^" for forcing the match to be at the beginning of the line
        // "\s*" for any leading whitespace characters
        // then the content we're matching
        // "\s*" for at any trailing whitespace
        // "$" for forcing end-match, e.g. no content between the cursor and the end of the sequence
        
        if (/^\s*(?:\*|\u2022)\s+$/.test(sequenceToTest)) {
            // "* " or "•" --> unordered list
            _clearRangeBeforeCursor();
            
            document.execCommand("insertUnorderedList");
            return false;
        }
        
        // "- " --> Dashed list
        var list;
        if (/^\s*-\s+$/.test(sequenceToTest)) {
            _clearRangeBeforeCursor();
            document.execCommand("insertUnorderedList");
            
            list = _parentList();
            list.className = "Apple-dash-list";
            
            return false;
        }
        
        // "1. " or "1) " to ordered list
        var matches = /^\s*([0-9]+)(?:\.|\))\s+$/.exec(sequenceToTest);
        if (matches) {
            _clearRangeBeforeCursor();
            document.execCommand("insertOrderedList");
            
            if (matches[1] != 1) {
                list = document.getSelection().anchorNode.parentNode;
                list.start = matches[1];
            }
            
            return false;
        }
    }
    
    return true;
}

function _rangeToInspect() {
    var selection = document.getSelection();
    
    // backup selection
    var oldSelectionRange = selection.getRangeAt(0);
    
    // modify selection in rtl-compliant manner
    selection.modify("extend", "backward", "lineboundary");
    var inspectionRange = selection.getRangeAt(0);
    
    // restore the old selection
    selection.removeAllRanges();
    selection.addRange(oldSelectionRange);
    
    return inspectionRange;
}

function _parentList() {
    var node = document.getSelection().anchorNode;
    while (node) {
        if (node.nodeName.toUpperCase() == "UL" || node.nodeName.toUpperCase() == "OL") {
            return node;
        }
        
        node = node.parentNode;
    }
    
    return;
}

function _clearRangeBeforeCursor() {
    // extend the current selection back to the previous line boundary
    var selection = document.getSelection();
    selection.modify("extend", "backward", "lineboundary");
    
    // delete the selected contents
    var range = selection.getRangeAt(0);
    var shouldInsertLinebreak = range.toString().startsWith("\n");
    range.deleteContents();
    if (!shouldInsertLinebreak && document.getSelection().anchorNode.textContent.length == 0) {
        shouldInsertLinebreak = true;
    }
    
    // Add the newline that was just deleted if needed
    if (shouldInsertLinebreak) {
        range.insertNode(document.createElement("br"));
    }
}

function _avoidFocusForElement(element) {
    const touchCancelEditorFocusDelay = 300; // Time to wait before enabling editor after a touch has been canceled.

    // For specific elements, we want to avoid editor focus when long-pressing. For example, showing a link preview should not
    // bring up the keyboard. The way for us to do this is to temporarily disable the editor while the element is being touched.
    element.addEventListener("touchstart", notewkwebview.disableEditor);
    element.addEventListener("touchmove", notewkwebview.enableEditor);
    element.addEventListener("touchcancel", function() {
        // It looks like there has been a change in timing as of 18A284a so we can't re-enable the editor too quickly, e.g.
        // before the context menu opens. Otherwise, the web view will focus the editor and start editing.
        setTimeout(notewkwebview.enableEditor, touchCancelEditorFocusDelay);
    });
    element.addEventListener("onclick", notewkwebview.enableEditor);
    element.addEventListener("touchend", onAnchorTouchEnd);
}
