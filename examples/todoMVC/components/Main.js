import Psk from "../../../src"
const { createElement } = Psk;

import TodoItem from './TodoItem.js';

class Main extends Psk.Component {
    constructor(props, stateManager) {
        super(props, stateManager);
        this.state = {
            todos: stateManager.state.todos || [{ text: 'Learn about Web Components', isEditing: false, completed: true }],
        };
    }

    render() {
        const todoItems = this.state.todos.map((todo, index) => {
            return new TodoItem({
                text: todo.text,
                isEditing: todo.isEditing,
                completed: todo.completed,
                index,
                onToggle: () => this.props.onToggle(index),
                onRemove: () => this.props.onRemove(index),
                onUpdate: this.props.onUpdate,
            }, this.stateManager).render();
        });
    
        return createElement('main', { class: 'main' }, [
            createElement('div', { class: 'toggle-all-container' }, [
                createElement('input', {
                    class: 'toggle-all',
                    type: 'checkbox',
                    onclick: this.props.onToggleAll,
                    'data-testid': 'toggle-all'
                }),
                createElement('label', { class: 'toggle-all-label', for: 'toggle-all' }, 'Toggle All Input')
            ]),
            createElement('ul', { class: 'todo-list', id:"todoList" }, todoItems)
        ]);
    }
}

export default Main;
