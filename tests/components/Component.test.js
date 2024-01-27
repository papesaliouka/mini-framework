import Component from '../../src/core/components/Component';

class TestComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { message: 'Hello' };
    }

    render() {
        return `<p>${this.state.message}</p>`;
    }
}

describe('Component', () => {
    it('should render correctly', () => {
        const component = new TestComponent();
        document.body.innerHTML = `<div id="app">${component.render()}</div>`;
        expect(document.body.innerHTML).toContain('<p>Hello</p>');
    });

    // Additional tests for lifecycle methods, state management, etc.
});

