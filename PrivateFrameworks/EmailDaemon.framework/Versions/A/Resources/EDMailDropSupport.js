//  Copyright © 2015 Apple Inc. All rights reserved.

function findMailDropNodes() {
    var parsedNodeMetadata = [];
    
    // Grab the banner node. There should only be one.
    var bannerNode = document.getElementsByClassName("x-apple-maildropbanner")[0];
    if (bannerNode) {
        parsedNodeMetadata.push(mailDropMetadata(bannerNode));
    }
    
    // Look for in-line Mail Drop links.
    var iterator = nodeIteratorForClassName("x-apple-maildrop");
    
    while ((node = iterator.nextNode())) {
        var nodeMetadata = mailDropMetadata(node);
        
        if (nodeMetadata) {
            // Extract the attachment's UUID from the download URL
            var dataURL = nodeMetadata["data-url"];
            
            if (dataURL) {
                // This works, but there may be a better way of doing it
                var matches = dataURL.match(/r=([^&]+)/);
                
                if (matches) {
                    // If successful, matches should have 2 entries: [ r=<argument>, <argument> ]
                    var attachmentUUID = matches[matches.length - 1];
                    node.id = attachmentUUID;
                }
            }

            parsedNodeMetadata.push(nodeMetadata);
        }
    }
    
    // Post a message containing the parsed nodes back to MobileMail
    window.webkit.messageHandlers.FinishedParsingMailDropNodes.postMessage(parsedNodeMetadata);
}

// Extracts MailDrop metadata from a given MailDrop node and returns a dictionary
function mailDropMetadata(node) {
    var nodeInfo = {};
    
    var className = node.className;
    if (className) {
        nodeInfo["class"] = className;
    }

    var dataURL = node.getAttribute("data-url");
    if (dataURL) {
        nodeInfo["data-url"] = dataURL;
    }
    
    var fileSize = node.getAttribute("data-size");
    if (fileSize) {
        if (0 == fileSize) {
            // ignore this size, and look for another value in the interior URL
            fileSize = undefined;

            // grab the interior wrapped link, there should only be one
            var aNode = node.getElementsByTagName("a")[0];
            if (aNode) {
                var wrappedLink = aNode.href;
                if (wrappedLink) {
                    var matches = wrappedLink.match(/sz=([\d]+)/);
                    if (matches) {
                        // If successful, matches should have 2 entries: [ sz=<argument>, <argument> ]
                        fileSize = matches[matches.length - 1];
                    }
                }
            }
        }

        if (fileSize) {
            nodeInfo["data-size"] = fileSize;
        }
    }
    
    var fileName = node.getAttribute("data-filename");
    if (fileName) {
        nodeInfo["data-filename"] = fileName;
    }
    
    var expiration = node.getAttribute("data-expiration");
    if (expiration) {
        nodeInfo["data-expiration"] = expiration;
    }

    return nodeInfo;
}


/*!
 * Utilities
 */

// Returns a NodeIterator for nodes of the given class
function nodeIteratorForClassName(className) {
    var filter =
    { acceptNode: function(node) {
        if (node.className == className) {
            return NodeFilter.FILTER_ACCEPT;
        }
    }};
    
    return document.createNodeIterator(document.body, NodeFilter.SHOW_ELEMENT, filter);
}

// Replaces the given Nodes with the associated HTML string
function replaceNodeWithIdWithHTML(htmlByNodeIDDictionary) {
    console.log(htmlByNodeIDDictionary)
    
    for (var nodeId in htmlByNodeIDDictionary) {
        var node = document.getElementById(nodeId);
        if (node) {
            // Create a temporary wrapper node to dump our HTML string into
            var wrapper = document.createElement("div");
            wrapper.innerHTML = htmlByNodeIDDictionary[nodeId];
            
            // Extract the created element from the wrapper
            var newElement = wrapper.firstChild;
            
            if(newElement) {
                node.parentNode.replaceChild(newElement, node);
            }
        }
    }
    // Add the Unicode BOM to force WebKit to use UTF8 when decoding.
    return '\uFEFF' + document.documentElement.innerHTML;
}

findMailDropNodes();
