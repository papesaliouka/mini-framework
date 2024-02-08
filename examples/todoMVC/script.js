import Psk from "../../src" 

// JavaScript using your framework to implement TodoMVC

class TodoApp extends Psk.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: ["hey"],
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

    render() {
        return (
            `<div>
                <h1>Todo App</h1>
                <input
                    type="text"
                    value="${this.state.newTodo}"
                    id="todoInput"
                />
                <button id="addTodoButton">Add Todo</button>
                <ul>
                    ${this.state.todos.map((todo, index) => (
                        `<li>
                            ${todo}
                            <button id="removeTodoButton-${index}">Remove</button>
                        </li>`
                    )).join('')}
                </ul>
            </div>`
        );
    }

    componentDidMount() {
        // Attach event listeners
        document.getElementById('addTodoButton').addEventListener('click', this.addTodo);
        document.getElementById('todoInput').addEventListener('input', (event) => {
            this.updateNewTodoValue(event.target.value);
        });
        this.state.todos.forEach((_, index) => {
            document.getElementById(`removeTodoButton-${index}`).addEventListener('click', () => {
                this.removeTodo(index);
            });
        });
    }

}

const app = new TodoApp();

app.mount("#app");

