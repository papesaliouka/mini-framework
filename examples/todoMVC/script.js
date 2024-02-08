import Psk from "../../src" 

// JavaScript using your framework to implement TodoMVC

class TodoApp extends Psk.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: ["hey","man"],
            newTodo: ''
        };
    }

    addTodo=()=> {
        if (this.state.newTodo.trim()) {
            this.setState({
                todos: [...this.state.todos, this.state.newTodo.trim()],
                newTodo: ''
            });
        }
    }

    removeTodo=(index)=> {
        this.setState({
            todos: this.state.todos.filter((_, i) => i !== index)
        });
    }

    updateNewTodoValue=(value)=> {
        this.setState({ newTodo: value });
    }

    attachRemoveTodoListeners() {
        this.element.querySelectorAll('.removeTodoButton').forEach(button => {
            const index = parseInt(button.getAttribute('data-index'), 10);
            button.onclick = () => this.removeTodo(index);
        });
    }

    componentDidMount() {
        // Attach event listeners
        document.getElementById('addTodoButton').addEventListener('click', this.addTodo.bind(this));
        document.getElementById('newTodoInput').addEventListener('input', (event) => this.updateNewTodoValue(event.target.value));
    
        // Since todos can change, consider re-attaching these in the update method or after list updates
        document.querySelectorAll('.removeTodoButton').forEach(button => {
            button.addEventListener('click', () => this.removeTodo(button.dataset.index));
        });
    }

    
    componentDidUpdate(oldState, newState) {

        document.querySelectorAll('.removeTodoButton').forEach(button => {
            button.addEventListener('click', () => this.removeTodo(button.dataset.index));
        });

        // Re-attach event listeners if needed
        if (oldState.todos.length !== newState.todos.length) {
            document.querySelectorAll('.removeTodoButton').forEach(button => {
                button.addEventListener('click', () => this.removeTodo(button.dataset.index));
            });
        }
    }
    update() {
        // Assuming `this.element` is the container div from `mount`
        const todoList = this.element.querySelector('#todoList');
        if (todoList) {
            // Generate new todo list HTML
            const newTodoListHtml = this.state.todos.map((todo, index) => `
                <li>
                    ${todo}
                    <button class="removeTodoButton" data-index="${index}">Remove</button>
                </li>
            `).join('');
    
            // Update the todo list's HTML
            todoList.innerHTML = newTodoListHtml;
        }
    
        // Reattach event listeners for remove buttons
        this.attachRemoveTodoListeners();
    }
    
    render() {
        return (
            `<div>
                <h1>Todo App</h1>
                <input type="text" id="newTodoInput" value="${this.state.newTodo}" />
                <button id="addTodoButton">Add Todo</button>
                <ul id="todoList">
                    ${this.state.todos.map((todo, index) => `
                        <li>
                            ${todo}
                            <button class="removeTodoButton" data-index="${index}">Remove</button>
                        </li>
                    `).join('')}
                </ul>
            </div>`
        );
    }

}

const app = new TodoApp();

app.mount("#app");

