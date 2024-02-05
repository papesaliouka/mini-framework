/**
 * @jest-environment jsdom
 */

import {describe, expect,it,
    beforeEach,
} from '@jest/globals';

import { updateElement } from '../../src/core/dom/updateElement';
import { createElement } from '../../src/core/dom/createElement';

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

