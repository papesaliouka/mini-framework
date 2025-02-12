import Psk from "../../../src"
const { createElement,updateElement } = Psk;

import Header from './Header.js';
import Main from './Main.js';
import TodoFooter from './TodoFooter.js';


class TodoApp extends Psk.Component{
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
            const newTodo = { text: newTodoText, isEditing: false, completed: false,
                id: Date.now(), // Simple unique ID generation for illustration
                };
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

    removeTodo = (todoId) => {
        const updatedTodos = this.state.todos.filter(todo => todo.id !== todoId);
        this.stateManager.setState({ todos: updatedTodos });
        this.setState({ todos: updatedTodos }, this.update); // Update state and trigger re-render
    }

    updateNewTodoValue = (event) => {
        this.setState({ newTodo: event.target.value });
    }

    setFilter = (newFilter,e) => {
        e.preventDefault();
        window.location.hash = newFilter;
        this.setState({ filter: newFilter }, this.update); // Update filter state and re-render
    };

    toggleTodoCompletion = (todoId) => {
        const updatedTodos = this.state.todos.map(todo => {
            if (todo.id === todoId) {
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

    toggleEditTodo = (id) => {
        const updatedTodos = this.state.todos.map((todo, i) => {
            if (todo.id === id) return { ...todo, isEditing: !todo.isEditing };
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
                            onclick: () => this.toggleTodoCompletion(todo.id)
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
                        onclick: () => { if (!todo.isEditing) this.toggleEditTodo(todo.id); },
                    }, todo.text),
                    createElement('button', {
                        class: 'destroy removeTodoButton',
                        'data-index': todo.id,
                        onclick: () => this.removeTodo(todo.id),
                    }),
                ]),
            ]);
            todoListElement.appendChild(todoItemElement);
        });

        const todoCountElement = this.element.querySelector('.todo-count');
        todoCountElement.textContent = `${this.state.todos.filter(item=> !item.completed).length} items left`;

        const filters = this.element.querySelectorAll('a');
        filters.forEach(filter => {
            if (filter.href.includes(this.state.filter)) {
                filter.setAttribute('class', 'selected');
            }else{
                filter.removeAttribute('class');
                filter.setAttribute('class', '');
            }
        }
        );

        const clearCompletedButton = this.element.querySelector('.clear-completed');
            
        if (this.state.todos.filter(item=>item.completed).length === 0) {
            clearCompletedButton.setAttribute('disabled', 'true');
        }else
        {
            clearCompletedButton.removeAttribute('disabled');
        }

        
    }

    render() {
        return createElement('section', { class: 'todoapp' }, [
            new Header({ newTodo: this.state.newTodo, onInput: this.updateNewTodoValue }, this.stateManager).render(),
            new Main({ todos: this.state.todos, onToggle: this.toggleTodoCompletion, onRemove: this.removeTodo, onUpdate: this.updateTodoText, onToggleAll: this.toggleAllTodos }, this.stateManager).render(),
            new TodoFooter({ todos: this.state.todos, setFilter: this.setFilter, clearCompleted: this.clearCompleted, filter: this.state.filter }, this.stateManager).render()
        ]);
    }
}

export default TodoApp;

