import TemplatingEngine from '../templating/templatingEngine.js';

// src/core/state/StateManager.js
class StateManager {
    constructor(initialState = {}) {
        this.state = initialState;
        this.listeners = new Map();
        this.bindings = []; // Array to store bindings
        this.templatingEngine = new TemplatingEngine();
    }


     bindTemplate(element, template, dataPaths) {
        const render = () => {
            element.innerHTML = this.templatingEngine.render(template, this.state);
        };

        // Store the binding for later updates
        this.bindings.push({ render, dataPaths });

        // Initial render
        render();

        // Add listeners for each data path
        dataPaths.forEach(path => {
            this.addListener(path, render);
        });
    }

    setState(newState) {
        let shouldRender = false;

        for (const key in newState) {
            if (this.state[key] !== newState[key]) {
                this.state[key] = newState[key];
                shouldRender = true;
                this.notifyListeners(key);
            }
        }

        // Re-render templates if necessary
        if (shouldRender) {
            this.bindings.forEach(binding => {
                binding.render();
            });
        }
    }
    
    // Add a listener to a state property
    addListener(property, listener) {
        if (!this.listeners.has(property)) {
            this.listeners.set(property, new Set());
        }
        this.listeners.get(property).add(listener);
    }

    // Notify all listeners about the state change
    notifyListeners(property) {
        if (this.listeners.has(property)) {
            for (const listener of this.listeners.get(property)) {
                listener(this.state[property]);
            }
        }
    }
}

export default StateManager;

