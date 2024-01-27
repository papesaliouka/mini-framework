
import { updateElement } from '../dom/updateElement';
import { createElement } from '../dom/createElement';

// tests/dom/updateElement.test.js

describe('updateElement', () => {
    let element;

    beforeEach(() => {
        element = createElement('div');
    });

    it('updates text content', () => {
        updateElement(element, { text: "Hello World" });
        expect(element.textContent).toBe("Hello World");
    });

    it('updates styles', () => {
        updateElement(element, { style: { color: 'red' } });
        expect(element.style.color).toBe('red');
    });

    it('updates attributes', () => {
        updateElement(element, { attributes: { 'data-test': 'value' } });
        expect(element.getAttribute('data-test')).toBe('value');
    });
});

