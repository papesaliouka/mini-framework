// src/core/components/Component.js

export default class Component {
    constructor(props = {}) {
        this.props = props;
        this.state = {};
        this.init(); // Initialization hook
    }

    init() {
        // Hook for initialization logic, can be overridden in subclass
    }

    setState(newState) {
        const oldState = this.state;
        this.state = { ...this.state, ...newState };
        this.render();
        this.componentDidUpdate(oldState, this.state); // Update hook
    }

    componentDidMount() {
        // Hook called after component is mounted, to be overridden in subclass
    }

    componentDidUpdate(oldState, newState) {
        // Hook called after state update, to be overridden in subclass
    }

    componentWillUnmount() {
        // Hook called before the component is unmounted, to be overridden in subclass
    }

    render() {
        // This method should be overridden by the component to return its HTML structure
    }

    mount(selector) {
        this.element = document.querySelector(selector);
        this.element.innerHTML = this.render();
        this.componentDidMount(); // Mounting hook
    }

    unmount() {
        this.componentWillUnmount(); // Unmounting hook
        this.element.remove();
    }
}

