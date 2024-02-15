import Psk from "../../src"
// Assuming Psk.Component is similar to the earlier described Component class

class TodoApp extends Psk.Component {
    constructor(props, stateManager) {
        super(props, stateManager);
        this.state = {
            newTodo: '',
            todos: stateManager.state.todos || []
        };
        // Bind methods if not using arrow functions
    }

    // Adds a new todo
    addTodo = () => {
        const newTodo = this.state.newTodo.trim();
        if (newTodo) {
            const currentTodos = this.stateManager.state.todos || [];
            this.stateManager.setState({
                todos: [...currentTodos, newTodo]
            });
            // Reset the local newTodo state and maintain focus
            this.setState({ newTodo: '' });
            this.focusNewTodoInput();
        }

        console.log('addTodo', this.stateManager.state.todos);
    }

    focusNewTodoInput() {
        const newTodoInput = this.element.querySelector('#newTodoInput');
        newTodoInput.value = ''; // Clear the input field
        newTodoInput.focus(); // Maintain focus
    }

    removeTodo = (index) => {
        const currentTodos = this.stateManager.state.todos || [];
        this.stateManager.setState({
            todos: currentTodos.filter((_, i) => i !== index)
        });
    }

    updateNewTodoValue = (event) => {
     this.setState({ newTodo: event.target.value });
    }


    componentDidMount() {
        this.stateManager.addListener('todos', todos => this.update());
        this.attachEventListeners();
    }

    componentWillUnmount() {
        this.stateManager.removeListener('todos', this.update);
    }

    update() {
        // Use global todos for rendering within the update method
        const todos = this.stateManager.state.todos || [];
    
        const todoListHtml = todos.map((todo, index) => `
            <li>
                ${todo}
                <button class="removeTodoButton" data-index="${index}">Remove</button>
            </li>
        `).join('');
    
        const todoListElement = this.element.querySelector('#todoList');
        todoListElement.innerHTML = todoListHtml;
    
        // Reattach event listeners for the dynamically created "Remove" buttons
        this.attachRemoveTodoListeners();
    
        // The focus handling on the input field remains unchanged
    }

    // Attaches event listeners to static and dynamic elements
    attachEventListeners() {
        const addButton = this.element.querySelector('#addTodoButton');
        const newTodoInput = this.element.querySelector('#newTodoInput');
        const aboutLink = this.element.querySelector('#aboutLink');

        //addButton.addEventListener('click', this.addTodo);
        Psk.addListener(addButton,'click',this.addTodo);
       // newTodoInput.addEventListener('input', this.updateNewTodoValue);
        Psk.addListener(newTodoInput,'input',this.updateNewTodoValue);
        Psk.addListener(aboutLink,"click",this.navigateToAbout)
       // aboutLink.addEventListener('click', this.navigateToAbout);

        // Attach listeners for dynamically added remove buttons
        this.attachRemoveTodoListeners();
    }

    // Attaches event listeners to dynamically created "Remove" buttons
    attachRemoveTodoListeners() {
        this.element.querySelectorAll('.removeTodoButton').forEach((button, index) => {
            button.addEventListener('click', () => this.removeTodo(index));
        });
    }

    navigateToAbout = () => {
        this.props.router.navigate('/about');
    }


    render() {
        // Use global todos for rendering
        const todos = this.stateManager.state.todos || [];
        return `
            <div>
                <h1>Todo App</h1>
                <input type="text" id="newTodoInput" placeholder="Add a new todo" value="${this.state.newTodo}" />
                <button id="addTodoButton">Add Todo</button>
                <ul id="todoList">
                    ${todos.map((todo, index) => `
                        <li>
                            ${todo}
                            <button class="removeTodoButton" data-index="${index}">Remove</button>
                        </li>
                    `).join('')}
                </ul>
                <button  id="aboutLink">About</button>
            </div>
        `;
    }
}

class AboutComp extends Psk.Component {
    constructor(props, stateManager) {
        super(props, stateManager);
        this.state = {
            todos: stateManager.state.todos || []
        };
    }



    componentDidMount() {
        console.log('About component mounted');
        console.log('Current state:', this.stateManager.state);
        const todoLink =  this.element.querySelector("#todoLink");

        //todoLink.addEventListener("click",()=>this.props.router.navigate("/"))
        Psk.addListener(todoLink,"click",()=> this.props.router.navigate("/"))

    }
    render() {
        return `
            <div>
                <h1>About</h1>
                <p>This is a simple todo app built with a custom component framework.</p>
                <button id="todoLink">Todo</button>
                ${this.state.todos && this.state.todos.length ? `
                    <h2>Todos</h2>
                    <ul>
                        ${this.state.todos.map(todo => `<li>${todo}</li>`).join('')}
                    </ul>
                ` : ''}

            </div>
        `;
    }
}


const routes = {
    '/': TodoApp,
    '/about': AboutComp
}

const stateManager = new Psk.StateManager();


// Simplified application setup assuming a single TodoApp instance

Psk.addListener(document,"DOMContentLoaded",()=>{
    const router = new Psk.Router(stateManager,routes)
})
