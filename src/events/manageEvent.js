
/**
 * Attaches an event listener to an element with enhanced capabilities.
 * @param {HTMLElement} element - The DOM element to attach the event to.
 * @param {string} eventType - The type of event to listen for.
 * @param {Function} callback - The callback function to execute.
 * @param {boolean | object} options - Optional parameters.
 */

function manageEvent(element, eventType, callback, options = {}) {
    const delegate = options.delegate;

    const handler = delegate
        ? (e) => {
            const delegateTarget = e.target.closest(delegate);
            if (delegateTarget) callback(e, delegateTarget);
        }
        : callback;

    element.addEventListener(eventType, handler, options);
    return () => element.removeEventListener(eventType, handler, options);
}

