import {ConnectedRouter, connectRouter, routerMiddleware} from "connected-react-router";
import {createBrowserHistory} from "history";
import React, {ComponentType} from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {withRouter} from "react-router-dom";
import {applyMiddleware, createStore, Reducer, Store} from "redux";
import createSagaMiddleware from "redux-saga";
import ErrorBoundary from "../components/ErrorBoundary";
import {devtools} from "./devtools";
import {ActionPayloadStore, Handler, saga, storeListener, rootReducer, setErrorAction} from "./redux";
import {registerActions, registerHandler, registerListener} from "./register";
import {AppView, StateView, ActionCreators} from "./type";

console.time("[framework] initialized");

function createApp(): AppView {
    const history = createBrowserHistory();
    const actionPayloadStore = new ActionPayloadStore();
    const sagaMiddleware = createSagaMiddleware();
    const reducer: Reducer<StateView> = rootReducer(connectRouter(history));
    const store: Store<StateView> = createStore(reducer, devtools(applyMiddleware(routerMiddleware(history), sagaMiddleware)));
    store.subscribe(storeListener(store));
    sagaMiddleware.run(saga, actionPayloadStore);
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
    return {history, store, sagaMiddleware, actionPayloadStore, modules: {}};
}
const app = createApp();

export function render(component: ComponentType<any>, onInitialized: null | (() => void) = null): void {
    const rootElement: HTMLDivElement = document.createElement("div");
    rootElement.id = "framework-app-root";
    document.body.appendChild(rootElement);
    const WithRouterComponent = withRouter(component);
    ReactDOM.render(
        <Provider store={app.store}>
            <ErrorBoundary>
                <ConnectedRouter history={app.history}>
                    <WithRouterComponent />
                </ConnectedRouter>
            </ErrorBoundary>
        </Provider>,
        rootElement,
        () => {
            console.timeEnd("[framework] initialized");
            if (typeof onInitialized === "function") {
                onInitialized();
            }
        }
    );
}

export function register<H extends Handler<any>>(handler: H): ActionCreators<H> {
    // Each module needs to load.
    if (app.modules.hasOwnProperty(handler.module)) {
        throw new Error(`module is already registered, module=${handler.module}`);
    }
    app.modules[handler.module] = false;
    registerHandler(handler, app);
    registerListener(handler, app);
    return registerActions(handler);
}
