import { createElement } from '../../src/core/dom/createElement';

describe('createElement', () => {
    it('should create an element with the specified tag', () => {
        const element = createElement('div');
        expect(element.tagName).toBe('DIV');
    });

    it('should set attributes on the element', () => {
        const attributes = { id: 'testId', class: 'testClass' };
        const element = createElement('div', attributes);
        expect(element.id).toBe('testId');
        expect(element.className).toBe('testClass');
    });

    // Additional tests for children, event listeners, etc.
});

