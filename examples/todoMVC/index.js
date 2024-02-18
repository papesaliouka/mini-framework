import Psk from "../../src";
import TodoApp from "./components"

const stateManager = new Psk.StateManager();
const routes = { '/': TodoApp,}

Psk.addListener(document, "DOMContentLoaded", () => {
    new Psk.Router(stateManager, routes);
});


