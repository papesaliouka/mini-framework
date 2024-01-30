# MiniReact - A Simplified React Framework

MiniReact is a simplified implementation of the React framework. This README provides an overview of the variables and functions used in the code.

## Variables

- **nextUnitOfWork**: Represents the next unit of work to be performed during the rendering process.

- **currentRoot**: Represents the current root of the fiber tree.

- **wipRoot**: Represents the work-in-progress root of the fiber tree during the reconciliation phase.

- **deletions**: An array that keeps track of elements to be deleted during the commit phase.

- **wipFiber**: Represents the work-in-progress fiber during the rendering of functional components.

- **hookIndex**: Represents the index of the current hook being processed in a functional component.

## Functions

### createElement(type, props, ...children)

Creates a virtual DOM element.

### createTextElement(text)

Creates a virtual DOM element for text.

### createDom(fiber)

Creates a real DOM element based on the virtual DOM element (fiber) and updates it.

### updateDom(dom, prevProps, nextProps)

Updates the real DOM element with new props and handles events.

### commitRoot()

Commits the changes to the actual DOM during the commit phase.

### commitWork(fiber)

Recursively commits changes for a given fiber and its children during the commit phase.

### commitDeletion(fiber, domParent)

Handles the deletion of elements during the commit phase.

### render(element, container)

Initiates the rendering process by creating a new root fiber and starting the reconciliation.

### workLoop(deadline)

The main loop that performs unit of work until there's no more work to be done.

### performUnitOfWork(fiber)

Determines whether to update a functional or host component and performs the corresponding update.

### useState(initial)

A custom hook to manage state in functional components.

### updateFunctionComponent(fiber)

Handles updates for functional components and hooks.

### updateHostComponent(fiber)

Handles updates for host components (regular HTML elements).

### reconcileChildren(wipFiber, elements)

Reconciles the children of a fiber node, updating, appending, or deleting as necessary.

## Usage

```jsx
const MiniReact = {
  createElement,
  render,
  useState,
};

/** @jsx MiniReact.createElement */
function Counter() {
  const [state, setState] = MiniReact.useState(1);
  return (
    <h1 onClick={() => setState(c => c + 1)}>
      Count: {state}
    </h1>
  );
}

const element = <Counter />;
const container = document.getElementById("root");
MiniReact.render(element, container);
