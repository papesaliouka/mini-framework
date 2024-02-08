// src/core/vdom/VNode.js
export default class VNode {
    constructor(tagName, attributes, children, key = null) {
        this.tagName = tagName;
        this.attributes = attributes || {};
        this.children = children || []; // Children can be VNodes or strings
        this.key = key; // Optional key property for diffing optimization
    }
}

