function createElement(tagName, attributes = {}, children = [], condition = true) {
    if (!condition) {
        return document.createDocumentFragment();
    }

    const element = document.createElement(tagName);

    // Set attributes and event listeners
    Object.keys(attributes).forEach(key => {
        if (key.startsWith('on') && typeof attributes[key] === 'function') {
            // It's an event listener
            const eventType = key.substring(2).toLowerCase();
            element.addEventListener(eventType, attributes[key]);
        } else {
            // It's a regular attribute
            element.setAttribute(key, attributes[key]);
        }
    });

    // Append children
    children.forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
            element.appendChild(child);
        }
    });

    return element;
}

