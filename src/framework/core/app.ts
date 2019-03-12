import {connectRouter, routerMiddleware} from "connected-react-router";
import {createBrowserHistory} from "history";
import {applyMiddleware, createStore, Reducer, Store} from "redux";
import createSagaMiddleware from "redux-saga";
import {devtools} from "../util/devtools";
import {saga, rootReducer, setErrorAction} from "./redux";
import {AppView, StateView, ActionHandler} from "./type";

console.time("[framework] initialized");

function createApp(): AppView {
    const history = createBrowserHistory();
    const actionHandler: {[type: string]: ActionHandler} = {};
    const sagaMiddleware = createSagaMiddleware();
    const reducer: Reducer<StateView> = rootReducer(connectRouter(history));
    const store: Store<StateView> = createStore(reducer, devtools(applyMiddleware(routerMiddleware(history), sagaMiddleware)));
    sagaMiddleware.run(saga);
    window.onerror = (message: string | Event, source?: string, line?: number, column?: number, error?: Error): void => {
        console.error("Window Global Error");
        console.error(`Message: ${message.toString()}`);
        if (error) {
            console.error(error);
        }
        if (source && line && column) {
            console.error(`Source: ${source} (${line}, ${column})`);
        }
        if (!error) {
            error = new Error(message.toString());
        }
        store.dispatch(setErrorAction(error));
    };

    return {history, store, sagaMiddleware, actionHandler, modules: {}};
}
const app = createApp();

export default app;
