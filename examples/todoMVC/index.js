import Psk from "../../src";

const { createElement } = Psk;

import TodoApp2 from "./components/TodoApp"

class TodoApp extends Psk.Component {
    constructor(props, stateManager) {
        super(props, stateManager);
        this.state = {
            newTodo: '',
            todos: stateManager.state.todos || [{ text: 'Learn about Web Components', isEditing: false, completed: true }],
            filter: 'all' // Add a filter state to manage the current view
        };
        this.handleInputEvent = this.updateNewTodoValue.bind(this);
        this.handleKeyPressEvent = this.handleKeyPress.bind(this);
        this.handleClickEvent = this.handleClick.bind(this);
    }

    addTodo = () => {
        const newTodoText = this.state.newTodo.trim();
        if (newTodoText) {
            const newTodo = { text: newTodoText, isEditing: false, completed: false };
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

    setFilter = (newFilter,e) => {
        e.preventDefault();
        this.setState({ filter: newFilter }, this.update); // Update filter state and re-render
    };

    toggleTodoCompletion = (index) => {
        const updatedTodos = this.state.todos.map((todo, i) => {
            if (i === index) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        this.stateManager.setState({ todos: updatedTodos });
        this.setState({ todos: updatedTodos }, this.update);
    }

    toggleAllTodos = () => {
        const allCompleted = this.state.todos.every(todo => todo.completed);
        const updatedTodos = this.state.todos.map(todo => ({ ...todo, completed: !allCompleted }));
        this.stateManager.setState({ todos: updatedTodos });
        this.setState({ todos: updatedTodos }, this.update);
    }
    


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

    clearCompleted = () => {
        const updatedTodos = this.state.todos.filter(todo => !todo.completed);
        this.stateManager.setState({ todos: updatedTodos });
        this.setState({ todos: updatedTodos }, this.update);
    }

    
    
        
    update() {
        const todoListElement = this.element.querySelector('#todoList');
        todoListElement.innerHTML = '';

        this.state.todos.filter(todo => {
            if( this.state.filter === 'active') {
                return !todo.completed;
            } else if (this.state.filter === 'completed') {
                return todo.completed;
            } else {
                return true;
            }
                })
        .map((todo, index) => {
            const todoItemElement = createElement('li', { key: index, class: todo.completed ? "completed":"" }, [
                createElement('div', { class: 'view' }, [
                    createElement('input', 
                        { class: 'toggle',
                            id: `todo-${index}`,
                            type: 'checkbox',
                            checked: todo.completed,
                            onclick: () => this.toggleTodoCompletion(index)                        
                        }
                    ),
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

        const todoCountElement = this.element.querySelector('.todo-count');
        todoCountElement.textContent = `${this.state.todos.filter(item=> !item.completed).length} items left`;

    }
    
    

    render() {
         const filteredTodos = this.state.todos.filter(todo => {
             if( this.state.filter === 'active') {
                 return !todo.completed;
             } else if (this.state.filter === 'completed') {
                    return todo.completed;
                } else {
                    return true;
                }

            
        }).map((todo, index) => {
            return createElement('li', { key: index, class: todo.completed ? "completed":""  }, [
                createElement('div', { class: 'view' }, [
                    createElement('input', 
                        { class: 'toggle',
                            type: 'checkbox',
                            id: `todo-${index}`,
                            checked: todo.completed,
                            onclick: () => this.toggleTodoCompletion(index)
                        }
                    ),
                    createElement('label', { contentEditable: todo.isEditing ? true : false }, todo.text),
                    createElement('button', {
                        class: 'destroy removeTodoButton',
                        'data-index': index,
                        onclick: () => this.removeTodo(index),
                    }),
                ]),
            ]);
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
                        onclick: this.toggleAllTodos,
                        'data-testid': 'toggle-all'
                    }),
                    createElement('label', { class: 'toggle-all-label', for: 'toggle-all' }, 'Toggle All Input')
                ]),
                createElement('ul', { class: 'todo-list', id: 'todoList' }, filteredTodos)
            ]),
            createElement('footer', { class: 'footer', 'data-testid': 'footer' }, [
                createElement('span', { class: 'todo-count' }, `${this.state.todos.filter(item=>!item.completed).length} items left`),
                createElement('ul', { class: 'filters', 'data-testid': 'footer-navigation' }, [
                    createElement('li', {}, [createElement('a', { href: '#/', onclick: () => this.setFilter('all') }, 'All')]),
                    createElement('li', {}, [createElement('a', { href: '#/active', onclick: (e) => this.setFilter('active',e) }, 'Active')]),
                    createElement('li', {}, [createElement('a', { href: '#/completed', onclick: (e) => this.setFilter('completed',e) }, 'Completed')])
                ]),
                createElement(
                    'button', 
                    {
                        class: 'clear-completed',
                        onclick: () => this.clearCompleted()                
                    }, 
                    'Clear completed'
                )
            ])
        ]);
    }
}





const stateManager = new Psk.StateManager();
const routes = { '/': TodoApp,
                '/section': TodoApp2,
}

Psk.addListener(document, "DOMContentLoaded", () => {
    new Psk.Router(stateManager, routes);
});


