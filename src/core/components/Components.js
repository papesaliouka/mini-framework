// src/core/components/Component.js

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
        this.element = this.render(); // Assume this returns a DOM element
        container.innerHTML = this.element;
        this.componentDidMount(); // Mounting hook
    }

    unmount() {
        this.componentWillUnmount(); // Unmounting hook
        this.element.remove();
    }

    update() {
        // Efficiently update the DOM based on new state
        const newElement = this.render(); // Assume this returns a DOM element
        //this.element.replaceWith(newElement);
        console.log(this.element);
        this.element = newElement;
    }
}

