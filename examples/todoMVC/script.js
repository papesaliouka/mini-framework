import Psk from "../../src"
// Assuming Psk.Component is similar to the earlier described Component class
class TodoApp extends Psk.Component {
    constructor(props, stateManager) {
        super(props, stateManager); // Assuming stateManager is passed but not used for simplicity
        this.state = {
            todos: ["hey", "man"],
            newTodo: ''
        };
    }

    // Adds a new todo
    addTodo = () => {
        if (this.state.newTodo.trim()) {
            this.setState({
                todos: [...this.state.todos, this.state.newTodo.trim()],
                newTodo: ''
            });
            // After adding a todo, manually clear the input field and maintain its focus
            const newTodoInput = this.element.querySelector('#newTodoInput');
            newTodoInput.value = ''; // Clear the input field
            newTodoInput.focus(); // Maintain focus
        }
    }
    
    updateNewTodoValue = (event) => {
        // Directly update the state without re-rendering the entire component
        this.state.newTodo = event.target.value; // Update state directly to avoid re-render
        // Consider a more efficient state management strategy for real applications
    }

    // Removes a todo by index
    removeTodo = (index) => {
        this.setState({
            todos: this.state.todos.filter((_, i) => i !== index)
        });
    }


    // Called after the component is initially rendered
    componentDidMount() {
        this.attachEventListeners();
    }

    // Attaches event listeners to static and dynamic elements
    attachEventListeners() {
        const addButton = this.element.querySelector('#addTodoButton');
        const newTodoInput = this.element.querySelector('#newTodoInput');

        addButton.addEventListener('click', this.addTodo);
        newTodoInput.addEventListener('input', this.updateNewTodoValue);

        // Attach listeners for dynamically added remove buttons
        this.attachRemoveTodoListeners();
    }

    // Attaches event listeners to dynamically created "Remove" buttons
    attachRemoveTodoListeners() {
        this.element.querySelectorAll('.removeTodoButton').forEach((button, index) => {
            button.addEventListener('click', () => this.removeTodo(index));
        });
    }

    // Called to manually update the component's rendered content

    update() {
        // Update only the todo list part of the component to prevent losing focus
        const todoListHtml = this.state.todos.map((todo, index) => `
            <li>
                ${todo}
                <button class="removeTodoButton" data-index="${index}">Remove</button>
            </li>
        `).join('');
    
        const todoListElement = this.element.querySelector('#todoList');
        todoListElement.innerHTML = todoListHtml;
    
        // Reattach event listeners for the dynamically created "Remove" buttons
        this.attachRemoveTodoListeners();
        
        // No need to re-render the entire component or the input field,
        // so the focus on the input field will be maintained.
    }

    // Renders the component's HTML
    render() {
        return `
            <div>
                <h1>Todo App</h1>
                <input type="text" id="newTodoInput" placeholder="Add a new todo" value="${this.state.newTodo}" />
                <button id="addTodoButton">Add Todo</button>
                <ul id="todoList">
                    ${this.state.todos.map((todo, index) => `
                        <li>
                            ${todo}
                            <button class="removeTodoButton" data-index="${index}">Remove</button>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
}

class AboutComp extends Psk.Component {
    render() {
        return `
            <div>
                <h1>About</h1>
                <p>This is a simple todo app built with a custom component framework.</p>
            </div>
        `;
    }
}


const routes = {
    '/': TodoApp,
    '/about': AboutComp
}


// Simplified application setup assuming a single TodoApp instance
document.addEventListener('DOMContentLoaded', () => {
    const router = new Psk.Router(null,routes);
});

