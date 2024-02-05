// Import core modules
import {
    createElement,
    updateElement,
    addListener,
    removeListener,
} from './core/dom';

import {
    StateManager,
    bind
} from  './core/state';


import Component from "./core/components"

// Export the framework's public API
export default {
  // Framework's public methods and properties
    createElement,
    updateElement,
    addListener,
    removeListener,
    StateManager,
    bind,
    Component
};



