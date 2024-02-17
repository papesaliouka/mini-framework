import Psk from "../../src";

const { createElement } = Psk;

class TodoApp extends Psk.Component {
    constructor(props, stateManager) {
        super(props, stateManager);
        this.state = {
            newTodo: '',
            todos: stateManager.state.todos || [],
            filter: 'all' // Add a filter state to manage the current view
        };
        this.handleInputEvent = this.updateNewTodoValue.bind(this);
        this.handleKeyPressEvent = this.handleKeyPress.bind(this);
        this.handleClickEvent = this.handleClick.bind(this);
    }

    addTodo = () => {
        const newTodoText = this.state.newTodo.trim();
        if (newTodoText) {
            const newTodo = { text: newTodoText, isEditing: false };
            const updatedTodos = [...this.state.todos, newTodo];
            this.stateManager.setState({ todos: updatedTodos });
            this.setState({ newTodo: '' }, this.update);
        }
    }
    
    
    focusNewTodoInput = () => {
        const newTodoInput = document.getElementById('newTodoInput');
        newTodoInput.value = '';
        if (newTodoInput) newTodoInput.focus();
    }

    removeTodo = (index) => {
        const updatedTodos = this.state.todos.filter((_, i) => i !== index);
        this.stateManager.setState({ todos: updatedTodos });
        this.setState({ todos: updatedTodos }, this.update); // Update state and trigger re-render
    }

    updateNewTodoValue = (event) => {
        this.setState({ newTodo: event.target.value });
    }

    setFilter = (newFilter) => {
        this.setState({ filter: newFilter }, this.update); // Update filter state and re-render
    };


    componentDidMount() {
        this.stateManager.addListener('todos', todos => {
            this.setState({ todos }, this.update); // Update state and trigger re-render
        });
        this.attachEventListeners();
    }

    componentWillUnmount() {
        this.detachEventListeners();
        this.stateManager.removeListener('todos', this.update);
    }


    attachEventListeners = () => {
        const todoAppContainer = this.element;
        todoAppContainer.addEventListener('input', this.handleInputEvent);
        todoAppContainer.addEventListener('keypress', this.handleKeyPressEvent);
        todoAppContainer.addEventListener('click', this.handleClickEvent);
    };
    
    detachEventListeners = () => {
        const todoAppContainer = this.element;
        todoAppContainer.removeEventListener('input', this.handleInputEvent);
        todoAppContainer.removeEventListener('keypress', this.handleKeyPressEvent);
        todoAppContainer.removeEventListener('click', this.handleClickEvent);
    };

    handleKeyPress = (event) => {
        if (event.target.id === 'newTodoInput' && event.key === 'Enter') {
            this.addTodo();
            this.focusNewTodoInput();
        }
    };
    
    handleClick = (event) => {
        if (event.target.classList.contains('removeTodoButton')) {
            const index = parseInt(event.target.dataset.index, 10);
            this.removeTodo(index);
        }
    };

    toggleEditTodo = (index) => {
        const updatedTodos = this.state.todos.map((todo, i) => {
            if (i === index) return { ...todo, isEditing: !todo.isEditing };
            return todo;
        });
        this.setState({ todos: updatedTodos }, this.update);
    }

    updateTodoText = (index, newText) => {
        const updatedTodos = this.state.todos.map((todo, i) => {
            if (i === index) return { ...todo, text: newText, isEditing: false };
            return todo;
        });
        this.setState({ todos: updatedTodos }, this.update);
    }
    
    
        
    update() {
        const todoListElement = this.element.querySelector('#todoList');
        todoListElement.innerHTML = '';
    
        this.state.todos.forEach((todo, index) => {
            const todoItemElement = createElement('li', { key: index }, [
                createElement('div', { class: 'view' }, [
                    createElement('input', { class: 'toggle', type: 'checkbox' }),
                    createElement('label', {
                        contentEditable: todo.isEditing ? true : false,
                        onblur: (event) => this.updateTodoText(index, event.target.textContent),
                        onkeypress: (event) => {
                            if (event.key === 'Enter') {
                                event.preventDefault(); // Prevent newline on enter
                                event.target.blur(); // Save changes on enter
                            }
                        },
                        onclick: () => { if (!todo.isEditing) this.toggleEditTodo(index); },
                    }, todo.text),
                    createElement('button', {
                        class: 'destroy removeTodoButton',
                        'data-index': index,
                        onclick: () => this.removeTodo(index),
                    }),
                ]),
            ]);
            todoListElement.appendChild(todoItemElement);
        });
    }
    
    

    render() {
         const filteredTodos = this.state.todos.filter(todo => {
            switch (this.state.filter) {
                case 'active': return !todo.completed;
                case 'completed': return todo.completed;
                default: return true;
            }
        });
        // Constructing the entire component tree with createElement
        return createElement('section', { class: 'todoapp' }, [
            createElement('header', { class: 'header' }, [
                createElement('h1', {}, 'Todos'),
                createElement('div', { class: 'input-container' }, [
                    createElement('input', {
                        class: 'new-todo',
                        type: 'text',
                        id: 'newTodoInput',
                        placeholder: 'What needs to be done?',
                        value: this.state.newTodo,
                        oninput: this.updateNewTodoValue // Handling input event
                    })
                ])
            ]),
            createElement('main', { class: 'main' }, [
                createElement('div', { class: 'toggle-all-container' }, [
                    createElement('input', {
                        class: 'toggle-all',
                        type: 'checkbox',
                        'data-testid': 'toggle-all'
                    }),
                    createElement('label', { class: 'toggle-all-label', for: 'toggle-all' }, 'Toggle All Input')
                ]),
                createElement('ul', { class: 'todo-list', id: 'todoList' }, filteredTodos)
            ]),
            createElement('footer', { class: 'footer', 'data-testid': 'footer' }, [
                createElement('span', { class: 'todo-count' }, `${this.state.todos.length} items left`),
                createElement('ul', { class: 'filters', 'data-testid': 'footer-navigation' }, [
                    createElement('li', {}, [createElement('a', { href: '#/', onclick: () => this.setFilter('all') }, 'All')]),
                    createElement('li', {}, [createElement('a', { href: '#/active', onclick: () => this.setFilter('active') }, 'Active')]),
                    createElement('li', {}, [createElement('a', { href: '#/completed', onclick: () => this.setFilter('completed') }, 'Completed')])
                ]),
                createElement('button', { class: 'clear-completed' }, 'Clear completed')
            ])
        ]);
    }
}

const stateManager = new Psk.StateManager();
const routes = { '/': TodoApp };

Psk.addListener(document, "DOMContentLoaded", () => {
    new Psk.Router(stateManager, routes);
});

