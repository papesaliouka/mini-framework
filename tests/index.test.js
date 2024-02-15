/**
 * @jest-environment jsdom
 */
import {describe, expect, it} from '@jest/globals';

import MyFramework from '../src';


describe('MyFramework', () => {
    it('should be defined', () => {
        expect(MyFramework).toBeDefined();
    });
    


    it('should have a method called createElement', () => {
        expect(MyFramework.createElement).toBeDefined();
    })

    it('should have a method called updateElement', () => {
        expect(MyFramework.updateElement).toBeDefined();
    });

    it('should have a method called removeListeners', () => {
        expect(MyFramework.removeListeners).toBeDefined();
    });

    it('should have a method called addListener', () => {
        expect(MyFramework.addListener).toBeDefined();
    });

    it('should have a method called StateManager', () => {
        expect(MyFramework.StateManager).toBeDefined();
    });

    it('should have a method called Component', () => {
        expect(MyFramework.Component).toBeDefined();
    })

    it('should have a method called bind', () => {
        expect(MyFramework.bind).toBeDefined();
    })

}
);

// Path: src/index.js
