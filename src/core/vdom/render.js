// src/core/vdom/render.js
import { addListener } from '../dom/listenerManager.js';

export default function render(vnode) {
    if (typeof vnode === 'string') {
        return document.createTextNode(vnode);
    }

    const element = document.createElement(vnode.tagName);
    for (const [key, value] of Object.entries(vnode.attributes)) {
        if (key.startsWith('on') && typeof value === 'function') {
            addListener(element, key.substring(2).toLowerCase(), value);
        } else {
            element.setAttribute(key, value);
        }
    }

    vnode.children.map(render).forEach(child => element.appendChild(child));
    return element;
}

