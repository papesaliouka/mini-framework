```markdown
# Psk Framework Documentation

## Overview

This document provides an updated guide on using the core functionalities of the Psk Framework, illustrated through the development of a Todo App. Psk Framework simplifies building dynamic web applications by offering an intuitive API for DOM manipulation, event handling, state management, and routing.

## Table of Contents

- [DOM Element Creation](#dom-element-creation)
- [Event Handling](#event-handling)
- [State Management](#state-management)
- [Componentization](#componentization)
- [Routing](#routing)

## DOM Element Creation

Psk abstracts the DOM to provide a simpler interface for creating and updating elements. This promotes a declarative way of building the UI.

### `createElement` Usage

```javascript
import Psk from "psk";

const { createElement } = Psk;

// Creating a new div with text content
const todoItem = createElement('div', { class: 'todo-item' }, 'Buy milk');
document.body.appendChild(todoItem);
```

## Event Handling

Psk provides a streamlined way to attach and manage events, enhancing the developer experience by abstracting away boilerplate code.

### Example: Attaching an Event Listener

Within the Todo App, event listeners are attached to handle user inputs and actions, such as adding a new todo item.

```javascript
class TodoApp extends Psk.Component {
    constructor(props, stateManager) {
        super(props, stateManager);
        this.handleKeyPressEvent = this.handleKeyPress.bind(this);
    }

    attachEventListeners() {
        const inputField = this.element.querySelector('#newTodoInput');
        inputField.addEventListener('keypress', this.handleKeyPressEvent);
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.addTodo();
        }
    }
}
```

## State Management

Psk integrates a state management solution, allowing components to maintain their state and react to state changes.

### Using `StateManager`

```javascript
const stateManager = new Psk.StateManager({
    todos: []
});

class TodoApp extends Psk.Component {
    addTodo() {
        // Logic to add a new todo
        stateManager.setState({ todos: updatedTodos });
    }
}
```

## Componentization

Psk encourages building applications with reusable components, each encapsulating its own logic and state.

### Defining and Using a Component

```javascript
import Psk from "psk";

class Header extends Psk.Component {
    render() {
        return createElement('header', {}, 'Todo App');
    }
}

// In the main app component
const header = new Header();
const headerElement = header.render();
document.body.appendChild(headerElement);
```

## Routing

Psk offers a simple routing solution, enabling the development of single-page applications (SPAs) with multiple views.

### Configuring Routes

```javascript
import Psk from "psk";
import TodoApp from "./components/TodoApp";

const stateManager = new Psk.StateManager();
const routes = { '/': TodoApp };

Psk.addListener(document, "DOMContentLoaded", () => {
    new Psk.Router(stateManager, routes);
});
```

This updated documentation for the Psk Framework provides a quick reference for developers using the Todo App as an example. It covers the essential features needed to build dynamic and interactive web applications with Psk.
```

This markdown documentation outlines the core features of the Psk Framework, offering a quick and comprehensive guide for developers interested in using this framework for their web applications, demonstrated with the Todo App example.
