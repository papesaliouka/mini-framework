// src/core/vdom/patch.js
import render from './render.js';
import { changed } from './diff.js';

/**
 * Updates the real DOM to reflect changes made to the virtual DOM.
 * 
 * @param {HTMLElement} parent - The parent DOM element.
 * @param {Object} newNode - The new virtual DOM node.
 * @param {Object} oldNode - The old virtual DOM node.
 * @param {number} index - The current index in the parent node.
 */
export default function updateElement(parent, newNode, oldNode, index = 0) {
    if (!oldNode) {
        // If the old node does not exist, append the new node
        parent.appendChild(render(newNode));
    } else if (!newNode) {
        // If the new node does not exist, remove the old node
        parent.removeChild(parent.childNodes[index]);
    } else if (changed(newNode, oldNode)) {
        // If the nodes have changed, replace the old node with the new node
        parent.replaceChild(render(newNode), parent.childNodes[index]);
    } else if (newNode.tagName) {
        // If the node type is the same, update attributes and children
        updateAttributes(parent.childNodes[index], newNode.attributes, oldNode.attributes);

        const newLength = newNode.children.length;
        const oldLength = oldNode.children.length;
        for (let i = 0; i < newLength || i < oldLength; i++) {
            updateElement(parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
        }
    }
}
/**
 * Updates the attributes of a real DOM element based on the virtual DOM.
 *
 * @param {HTMLElement} element - The DOM element to update.
 * @param {Object} newProps - The new set of properties.
 * @param {Object} oldProps - The old set of properties.
 */
function updateAttributes(element, newProps, oldProps) {
    for (const prop in newProps) {
        if (newProps[prop] !== oldProps[prop]) {
            element.setAttribute(prop, newProps[prop]);
        }
    }
    for (const prop in oldProps) {
        if (!(prop in newProps)) {
            element.removeAttribute(prop);
        }
    }
}

