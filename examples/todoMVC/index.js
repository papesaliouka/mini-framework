import Psk from "../../src";
import TodoApp from "./components/TodoApp"

const stateManager = new Psk.StateManager();
const routes = { '/': TodoApp,}

Psk.addListener(document, "DOMContentLoaded", () => {
    new Psk.Router(stateManager, routes);
});


