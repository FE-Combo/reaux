import {connectRouter, routerMiddleware} from "connected-react-router";
import {createBrowserHistory} from "history";
import {applyMiddleware, createStore, Reducer, Store} from "redux";
import createSagaMiddleware from "redux-saga";
import {devtools} from "../util/devtools";
import {saga, rootReducer} from "./redux";
import {AppView, StateView, ActionHandler} from "./type";

console.time("[framework] initialized");

function createApp(): AppView {
    const history = createBrowserHistory();
    const actionHandler: {[type: string]: ActionHandler} = {};
    const sagaMiddleware = createSagaMiddleware();
    const reducer: Reducer<StateView> = rootReducer(connectRouter(history));
    const store: Store<StateView> = createStore(reducer, devtools(applyMiddleware(routerMiddleware(history), sagaMiddleware)));
    sagaMiddleware.run(saga);
    return {history, store, sagaMiddleware, actionHandler, modules: {}, errorHandler: null};
}
const app = createApp();

export default app;
