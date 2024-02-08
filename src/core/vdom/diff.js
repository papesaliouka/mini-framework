// src/core/vdom/diff.js

/**
 * Checks if two nodes are different.
 * 
 * @param {Object} node1 - The first node to compare.
 * @param {Object} node2 - The second node to compare.
 * @returns {boolean} - Returns true if nodes are different, otherwise false.
 */
function changed(node1, node2) {
    // Check if both nodes are defined
    if (!node1 || !node2) {
        return true;
    }

    // Check for different types
    if (typeof node1 !== typeof node2) {
        return true;
    }

    // If nodes are of type 'string' or 'number', compare their values
    if (typeof node1 === 'string' || typeof node1 === 'number') {
        return node1 !== node2;
    }

    // Corrected property checks
    return node1.tagName !== node2.tagName || node1.key !== node2.key
}

// Export the 'changed' function
export { changed };

