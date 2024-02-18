
import Psk from "../../../src"
const { createElement } = Psk;

class TodoFooter extends Psk.Component {
    constructor(props, stateManager) {
        super(props, stateManager);
        this.state = {
            todos: stateManager.state.todos || [{ text: 'Learn about Web Components', isEditing: false, completed: true }],
        };
    }

    render() {
        return createElement('footer', { class: 'footer', 'data-testid': 'footer' }, [
            createElement('span', { class: 'todo-count' }, `${this.state.todos.filter(item=>!item.completed).length} items left`),
            createElement('ul', { class: 'filters', 'data-testid': 'footer-navigation' }, [
                createElement('li', {}, [createElement('a', { href: '#/', onclick: (e) => this.props.setFilter('all',e) }, 'All')]),
                createElement('li', {}, [createElement('a', { href: '#/active', onclick: (e) => this.props.setFilter('active',e) }, 'Active')]),
                createElement('li', {}, [createElement('a', { href: '#/completed', onclick: (e) => this.props.setFilter('completed',e) }, 'Completed')])
            ]),
            createElement(
                'button', 
                {
                    class: 'clear-completed',
                    onclick: () => this.props.clearCompleted()                
                }, 
                'Clear completed'
            )
        ]);
    }
}


export default TodoFooter;
