// src/core/components/Component.js
import {createElement} from '../dom';

export default class Component {
    constructor(props = {}) {
        this.props = props;
        this.state = {};
        this.element = null; // Reference to the DOM element
        this.init(); // Initialization hook
    }

    init() {
        // Initialization logic (can be overridden in subclass)
    }

    setState(newState) {
        const oldState = this.state;
        this.state = { ...this.state, ...newState };

        // Re-render the component
        this.update();
        this.componentDidUpdate(oldState, this.state); // Update hook
    }

    componentDidMount() {
        // Called after component is mounted (to be overridden in subclass)
    }

    componentDidUpdate(oldState, newState) {
        // Called after state update (to be overridden in subclass)
    }

    componentWillUnmount() {
        // Called before the component is unmounted (to be overridden in subclass)
    }

// src/core/components/Component.js
    render() {
        // Should be overridden by the component to return its structure (possibly JSX)
    }

    mount(selector) {
        const container = document.querySelector(selector);
        // Ensure container is not null
        if (!container) {
            console.error(`Cannot find element with selector '${selector}'`);
            return;
        }
    
        // Convert the HTML string to DOM elements and append
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = this.render(); // Assuming render returns an HTML string
    
        // Assuming you want to replace the entire content of the container
        container.innerHTML = '';
        Array.from(tempContainer.childNodes).forEach(child => {
            container.appendChild(child);
        });
    
        this.element = container; // Assuming you want to keep a reference to the container
    
        this.componentDidMount();
    }
    
    unmount() {
        this.componentWillUnmount(); // Unmounting hook
        this.element.remove();
    }

    update() {
        const newContent = this.render(); // Assuming this returns new HTML content
        const tempContainer = createElement('div');
        tempContainer.innerHTML = newContent;
    
        // Assuming this.element references the container from mount
        this.element.innerHTML = ''; // Clear existing content
        Array.from(tempContainer.childNodes).forEach(child => {
            this.element.appendChild(child);
        });
    
        // Re-attach event listeners or perform other update-related tasks
    }
    
}

