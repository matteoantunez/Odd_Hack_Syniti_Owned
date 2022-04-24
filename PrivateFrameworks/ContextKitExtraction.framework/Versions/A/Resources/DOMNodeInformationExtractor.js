/**
 *  A minified version of this is included in ContextExtraction because this
 *  code is loaded by clients. This file should be update along with the
 *  minified version.
 *
 *  Created by Alan Hshieh and Stephanie Dong on 1/9/20.
 *  Copyright © 2020 Apple, Inc. All rights reserved.
 */
let traversed = null;

/**
 * Enumerates all text nodes in the hierarchy and retrieves their positional information,
 * returning it as a JSON-formatted string.
 * @return {String}    A JSON formatted string of the view and elements.
 */
function retrieveNodeInformation() {
    const kMaxNumberOfNodesToProcess = 250;
    const kMinNodeHeight = 10;
    const kMinNodeWidth = 70;
    const kMinTextLength = 5;
    const kMaxTextLength = 250;
    traversed = new Set();

    let currentNode, nodeIterator = document.createNodeIterator(document.body, NodeFilter.SHOW_ELEMENT);
    let nodes = [];

    while (currentNode = nodeIterator.nextNode()) {
        if (traversed.has(currentNode)) {
            continue;
        }

        // Bounding box of element relative to origin of document
        let elementRect = elementBoundingBoxInPage(currentNode);
        let nodeIsLargeEnough = elementRect.height > kMinNodeHeight && elementRect.width > kMinNodeWidth;
        let nodeIsVisibleToUser = elementIsVisibleInViewport(currentNode);

        if (!nodeIsLargeEnough || elementIsHidden(currentNode)) {
            continue;
        }

        // Strip out children nodes. We only care about content in the immediate node.
        let text = [].map.call(currentNode.childNodes, function(child) {
            return child.nodeType == 3 && child.nodeValue.trim() ? child.nodeValue.trim() : undefined;
        }).filter(e => e != null).join().trim();

        let [shouldGetText, nodeClass] = shouldGetAllText(currentNode);
        if (shouldGetText) {
            text = getAllText(currentNode).join(', ').trim();
        }

        let pagesFromViewport = elementOriginPagesFromViewport(elementRect);
        // Exclude content that is much too short or too long.
        let isAllTheSameCharacter = /^(.)\1+$/.test(text)
        if (text.length > kMinTextLength && text.length < kMaxTextLength && !isAllTheSameCharacter) {
            node = {
            text: text,
            className: nodeClass,
            left: elementRect.left,
            right: elementRect.right,
            top: elementRect.top,
            bottom: elementRect.bottom,
            onScreen: nodeIsVisibleToUser ? 1 : 0,
            pagesFromViewport: pagesFromViewport
            };

            nodes.push(node);
            if (nodes.length > kMaxNumberOfNodesToProcess) {
                // Only keep nodes that are closer to the viewport
                if (nodes[0].pagesFromViewPort > node.pagesFromViewPort) {
                    nodes.shift();
                } else {
                    nodes.pop();
                }
            }
        }
    }

    traversed = null;

    return JSON.stringify({
    nodes: nodes
    });
}

/**
 * Check if element is a special class and we should get all text rooted at this element.
 * @param  {node} element The node of interest
 * @return {array[bool, string]} Boolean to mark if should get all text, and className of element.
 */
function shouldGetAllText(element) {
    const itemtype = element.getAttribute('itemtype');
    if (itemtype && itemtype.includes('schema.org/')) {
        return [true, itemtype];
    }

    const nodeName = element.nodeName;
    if (nodeName && ['address'].includes(nodeName.toString().toLowerCase())) {
        return [true, nodeName];
    }

    return [false, null];
}


/**
 * Get all text rooted at element and mark all traversed nodes.
 * @param  {node} element The node of interest
 * @return {string} All text rooted at element
 */
function getAllText(element) {
    traversed.add(element);
    return [].flatMap.call(element.childNodes, function(child) {
        if (child.nodeType == Node.ELEMENT_NODE && elementIsHidden(child)) {
            return undefined;
        }
        if (child.nodeType == Node.TEXT_NODE) {
            let nodeValue = child.nodeValue.trim();
            return nodeValue ? nodeValue : undefined;
        } else {
            return getAllText(child);
        }
    }).filter(e => !['|', ',', undefined].includes(e));
}


/**
 * Determines the global bounding box of element
 * @param  {node} element The node of interest
 * @return {dict} The bounding box rect of element.
 */
function elementBoundingBoxInPage(element) {
    // Use getBoundingClientRect() since it handles width/height after scaling.
    let clientRect = element.getBoundingClientRect();

    // window.scrollX and window.scrollY available in Webkit
    return {
    left: clientRect.left + window.scrollX,
    right: clientRect.right + window.scrollX,
    top: clientRect.top + window.scrollY,
    bottom: clientRect.bottom + window.scrollY,
    width: clientRect.width,
    height: clientRect.height
    };
}


/**
 * Determines if an Element is visible in the viewport
 * @param  {Element}    The element node to test
 * @return {Boolean}    Whether or not the element is visible in the viewport.
 */
function elementIsVisibleInViewport(element) {
    const clientRect = element.getBoundingClientRect();

    const inViewPort = (
                        clientRect.top < window.innerHeight &&
                        clientRect.left < window.innerWidth &&
                        clientRect.bottom > 0 &&
                        clientRect.right > 0
                        );

    if (!inViewPort) {
        return false;
    }


    const elemCenter = {
    x: clientRect.left + clientRect.width / 2,
    y: clientRect.top + clientRect.height / 2
    };

    let testedElement = element;
    let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
    if (pointContainer == null) {
        return false;
    }

    do {
        if (pointContainer === testedElement) {
            return true;
        }
    } while (testedElement = testedElement.parentNode);

    do {
        if (pointContainer === element) {
            return true;
        }
    } while (pointContainer = pointContainer.parentNode);

    return false;
}

/**
 * Determine if element is hidden via CSS style
 * @param {node} the element to check
 * @return {Boolean} Whether or not the element is hidden.
 */
function elementIsHidden(element) {
    const style = window.getComputedStyle(element);
    return (style.display === 'none' ||
            style.visibility !== 'visible' ||
            style.opacity === '0')
}


/**
 * Determine max window distance that element origin is from the visible viewport.
 * @param  {dict} The bounding box rect of an element.
 * @return {Boolean}      Whether or not the element is visible in the viewport.
 */
function elementOriginPagesFromViewport(elementRect) {
    let yOffset = 0,
    xOffset = 0;

    if (elementRect.top < window.pageYOffset) {
        yOffset = window.pageYOffset - elementRect.top;
    } else if (elementRect.top > (window.pageYOffset + window.innerHeight)) {
        yOffset = elementRect.top - window.pageYOffset - window.innerHeight;
    }


    if (elementRect.left < window.pageXOffset) {
        xOffset = window.pageXOffset - elementRect.left;
    } else if (elementRect.left > (window.pageXOffset + window.innerWidth)) {
        xOffset = elementRect.left - window.pageXOffset - window.innerWidth;
    }

    yOffset = Math.floor(yOffset / window.innerHeight);
    xOffset = Math.floor(xOffset / window.innerWidth);

    return Math.max(yOffset, xOffset);
}

retrieveNodeInformation()
