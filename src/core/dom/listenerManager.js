// dom/listenersManager.js

let listenerIdCounter = 0;
const elementListenersMap = new Map();

function addListener(element, eventType, listener) {
    if (!element._listenerId) {
        element._listenerId = ++listenerIdCounter;
    }

    const listeners = elementListenersMap.get(element._listenerId) || {};
    if (listeners[eventType]) {
        element.removeEventListener(eventType, listeners[eventType]);
    }
    listeners[eventType] = listener;
    element.addEventListener(eventType, listener);
    elementListenersMap.set(element._listenerId, listeners);
}

function removeListeners(element) {
    if (!element._listenerId) return;
    const listeners = elementListenersMap.get(element._listenerId);
    if (listeners) {
        Object.keys(listeners).forEach(eventType => {
            element.removeEventListener(eventType, listeners[eventType]);
        });
    }
    elementListenersMap.delete(element._listenerId);
}


export { addListener, removeListeners }

