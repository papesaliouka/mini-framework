// src/core/vdom/render.js
export default function render(vnode) {
    if (typeof vnode === 'string') {
        return document.createTextNode(vnode);
    }
    const element = document.createElement(vnode.tagName);
    for (const [key, value] of Object.entries(vnode.attributes)) {
        element.setAttribute(key, value);
    }
    vnode.children.map(render).forEach(element.appendChild.bind(element));
    return element;
}

