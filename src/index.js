// Import core modules
import {
    createElement,
    updateElement,
    addListener,
    removeListeners,
} from './core/dom/index.js';

import {
    StateManager,
    bind
} from  './core/state/index.js';

import {
    render as vdomRender,
} from "./core/vdom/index.js";

import Component from "./core/components/Components.js";

/**
 * Renders a component into the given container in the DOM.
 *
 * @param {Component} component - The component to render.
 * @param {HTMLElement} container - The DOM container to render the component into.
 */
function render(component, container) {
    const virtualDOM = vdomRender(component);
    // Initial render or update existing
    updateElement(container, virtualDOM, container.firstChild);
}

// Export the framework's public API
export default {
    createElement, // Function to create DOM elements
    updateElement, // Function to update DOM elements
    addListener, // Function to add event listeners
    removeListeners, // Function to remove event listeners
    StateManager, // State management functionality
    bind, // Function for state binding
    Component, // Base class for framework components
    render // Function to render components into the DOM
};

