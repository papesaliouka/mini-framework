// src/core/vdom/VNode.js
export default class VNode {
    constructor(tagName, attributes, children) {
        this.tagName = tagName;
        this.attributes = attributes;
        this.children = children; // Children can be VNodes or strings
    }
}

