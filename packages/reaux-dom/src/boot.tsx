/**
 * 1. create store
 * 2. create reducer
 * 3. error handle
 * 4. redux devtool
 */

import React, {ComponentType} from "react";
import ReactDOM from "react-dom";
import {withRouter} from "react-router-dom";
import {Reducer, compose, StoreEnhancer, Store, applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import {connectRouter, routerMiddleware, ConnectedRouter, RouterState, push} from "connected-react-router";
import {createBrowserHistory} from "history";
import createSagaMiddleware from "redux-saga";
import {createReducer, ErrorBoundary, setErrorAction, setStateAction, createCView, createAction, createApp, AppView, StateView, ErrorHandler, modelInjection, BaseOnGeneratorModel, BaseOnPromiseModel, saga, BaseModel} from "reaux";

console.time("[framework] initialized");

type State = StateView<RouterState>;

interface App extends AppView {
    store: Store<StateView<RouterState>>;
}
interface RenderOptions {
    Component: ComponentType<any>;
    onError?: ErrorHandler;
    onInitialized?: () => void;
}

const history = createBrowserHistory();
const reducer: Reducer<State> = createReducer(reducers => ({...reducers, router: connectRouter(history)}));
const historyMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const store: Store<StateView<RouterState>> = createStore(reducer, devtools(applyMiddleware(historyMiddleware, sagaMiddleware)));
const app: App = createApp(app => ({...app, store, sagaMiddleware}));
sagaMiddleware.run(saga, app);
modelInjection(store.getState(), (moduleName, initState, type) => store.dispatch(setStateAction(moduleName, initState, type)));

export function start(options: RenderOptions): void {
    // Whole project trigger once(main module).
    const {Component, onError, onInitialized} = options;
    if (typeof onError === "function") {
        app.exceptionHandler.onError = onError.bind(app);
    }
    listenGlobalError();
    const rootElement: HTMLDivElement = document.createElement("div");
    rootElement.id = "framework-app-root";
    document.body.appendChild(rootElement);
    const WithRouterComponent = withRouter(Component as any);
    ReactDOM.render(
        <Provider store={app.store}>
            <ErrorBoundary setErrorAction={setErrorAction}>
                <ConnectedRouter history={history!}>
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

export function register<H extends BaseModel>(handler: H, Component: ComponentType<any>) {
    // Trigger every module.
    if (app.modules.hasOwnProperty(handler.moduleName)) {
        throw new Error(`module is already registered, module=${handler.moduleName}`);
    }
    const {actions, actionsHandler} = createAction(handler);
    app.actionHandler = {...app.actionHandler, ...actionsHandler};
    const View = createCView(handler, Component);
    return {View, actions};
}

function listenGlobalError() {
    // 监听全局 error
    window.onerror = (message: string | Event, source?: string, line?: number, column?: number, error?: Error): void => {
        console.error("Window Global Error");
        if (!error) {
            error = new Error(message.toString());
        }
        app.store.dispatch(setErrorAction(error));
    };
}

function devtools(enhancer: StoreEnhancer): StoreEnhancer {
    // Add Redux DevTools plug-in support
    // Ref: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
    const extension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
    if (extension) {
        return compose(
            enhancer,
            extension({})
        );
    }
    return enhancer;
}

export class GModel<State extends {} = {}> extends BaseOnGeneratorModel<State> {
    setHistory(newURL: string) {
        app.store.dispatch(push(newURL));
    }
}

export class PModel<State extends {} = {}> extends BaseOnPromiseModel<State> {
    setHistory(newURL: string) {
        app.store.dispatch(push(newURL));
    }
}
