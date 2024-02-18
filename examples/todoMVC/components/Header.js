import Psk from "../../../src"
const { createElement } = Psk;

class Header extends Psk.Component {
    constructor(props, stateManager) {
        super(props, stateManager);
        this.state = {
            newTodo: ''
        };
    }

    render() {
        return createElement('header', { class: 'header' }, [
            createElement('h1', {}, 'Todos'),
            createElement('div', { class: 'input-container' }, [
                createElement('input', {
                    class: 'new-todo',
                    type: 'text',
                    id: 'newTodoInput',
                    placeholder: 'What needs to be done?',
                    value: this.state.newTodo,
                    oninput: this.props.onInput
                })
            ])
        ]);
    }
}

export default Header;
