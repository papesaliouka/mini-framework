
import Psk from "../../../src"
const { createElement } = Psk;

class TodoFooter extends Psk.Component {
    constructor(props, stateManager) {
        super(props, stateManager);
        this.state = {
            todos: stateManager.state.todos || [],
        };
    }

    render() {
        return createElement('footer', { class: 'footer', 'data-testid': 'footer' }, [
            createElement('span', { class: 'todo-count' }, `${this.state.todos.filter(item=>!item.completed).length} items left`),
            createElement('ul', { class: 'filters', 'data-testid': 'footer-navigation' }, [
                createElement('li', {}, [createElement('a', 
                    { 
                        href: '#/all',
                        onclick: (e) => this.props.setFilter('all',e),
                        class : this.props.filter === 'all' ? 'selected' : ''
                    }, 'All')]),
                createElement('li', {}, [createElement('a',     
                    { 
                        href: '#/active',
                        onclick: (e) => this.props.setFilter('active',e),
                        class : this.props.filter === 'active' ? 'selected' : ''

                    }, 'Active')]),
                createElement('li', {}, [createElement('a', 
                    { 
                        href: '#/completed',
                        onclick: (e) => this.props.setFilter('completed',e),
                        class : this.props.filter === 'completed' ? 'selected' : ''
                    }, 'Completed')])
            ]),
            createElement(
                'button', 
                {
                    class: 'clear-completed',
                    disabled: this.state.todos.filter(item=>item.completed).length === 0,
                    onclick: () => this.props.clearCompleted()                
                }, 
                'Clear completed'
            )
        ]);
    }
}


export default TodoFooter;
