import StateManager from '../../src/core/state/StateManager';

describe('StateManager', () => {
    let stateManager;

    beforeEach(() => {
        stateManager = new StateManager({ key: 'initialValue' });
    });

    it('should initialize with the given state', () => {
        expect(stateManager.state.key).toBe('initialValue');
    });

    it('should update the state correctly', () => {
        stateManager.setState({ key: 'updatedValue' });
        expect(stateManager.state.key).toBe('updatedValue');
    });

    // Tests for listener functionality, etc.
});

