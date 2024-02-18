import Psk from "../../../src"
const { createElement } = Psk;

class TodoItem extends Psk.Component {
    constructor(props, stateManager) {
        super(props, stateManager);
        this.state = {
            isEditing: false
        };
    }

    toggleEditTodo = () => {
        this.setState({ isEditing: !this.state.isEditing });
    }

    updateTodoText = (event) => {
        const newText = event.target.textContent;
        this.props.onUpdate(this.props.index, newText);
        this.setState({ isEditing: false });
    }

    render() {
        return createElement('li', { class: this.props
            .completed ? 'completed' : '' }, [
            createElement('div', { class: 'view' }, [
                createElement('input', 
                    { class: 'toggle',
                        type: 'checkbox',
                        checked: this.props.completed,
                        onclick: this.props.onToggle
                    }
                ),
                createElement('label', {
                    contentEditable: this.state.isEditing ? true : false,
                    onblur: this.updateTodoText,
                    onkeypress: (event) => {
                        if (event.key === 'Enter') {
                            event.preventDefault(); // Prevent newline on enter
                            event.target.blur(); // Save changes on enter
                        }
                    },
                    onclick: this.toggleEditTodo,
                }, this.props.text),
                createElement('button', {
                    class: 'destroy removeTodoButton',
                    'data-index': this.props.index,
                    onclick: this.props.onRemove,
                }),
            ]),
        ]);

    }
}

export default TodoItem;
