import "core-js/stable";
import React, {ComponentType} from "react";
import {createRoot} from "react-dom/client";
import {Reducer, compose, StoreEnhancer, Store, applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import {connectRouter, routerMiddleware, ConnectedRouter, push} from "connected-react-router";
import {createBrowserHistory} from "history";
import {createReducer, ErrorBoundary, setErrorAction, createView, createAction, createApp, BaseModel, createModel, App, createModuleReducer, middleware as reduxMiddleware} from "reaux";
import {Helper} from "./helper";
import {StateView, RenderOptions} from "./type";

const history = createBrowserHistory();
const app = generateApp();

export const helper = new Helper(app);

/**
 * Create history, reducer, middleware, store, app cache
 */
function generateApp(): App {
    const routerReducer = connectRouter(history);
    const asyncReducer = {router: routerReducer};
    const historyMiddleware = routerMiddleware(history);
    const reducer: Reducer<StateView> = createReducer(asyncReducer) as any;
    const store: Store<StateView> = createStore(
        reducer,
        devtools(
            applyMiddleware(
                historyMiddleware,
                reduxMiddleware(() => app.actionHandlers)
            )
        )
    );
    const app = createApp(store);
    app.asyncReducers = {...app.asyncReducers, ...asyncReducer};
    return app;
}

/**
 * Start react-dom render.
 * Project entry, trigger once. e.g: main module.
 * @param options
 */
export function start(options: RenderOptions): void {
    const {Component, onError} = options;
    if (typeof onError === "function") {
        app.exceptionHandler.onError = onError.bind(app);
    }
    listenGlobalError();
    const rootElement: HTMLDivElement = document.createElement("div");
    rootElement.id = "framework-app-root";
    document.body.appendChild(rootElement);
    const root = createRoot(rootElement);
    root.render(
        <Provider store={app.store}>
            <ErrorBoundary onError={setErrorAction}>
                <ConnectedRouter history={history}>
                    <Component />
                </ConnectedRouter>
            </ErrorBoundary>
        </Provider>
    );
}

/**
 * Register module create View and actions.
 * Trigger in every module.
 * @param handler
 * @param view
 */
export function register<H extends BaseModel>(handler: H, Component: ComponentType<any>) {
    // ref: https://stackoverflow.com/questions/39282873/object-hasownproperty-yields-the-eslint-no-prototype-builtins-error-how-to
    if (Object.prototype.hasOwnProperty.call(app.modules, handler.moduleName)) {
        throw new Error(`module is already registered, module=${handler.moduleName}`);
    }
    app.modules[handler.moduleName] = true;

    // register reducer
    const currentModuleReducer = createModuleReducer(handler.moduleName, handler.initState);

    app.asyncReducers[handler.moduleName] = currentModuleReducer;
    app.store.replaceReducer(createReducer(app.asyncReducers));

    // register actions
    const {actions, actionHandlers} = createAction(handler);
    app.actionHandlers = {...app.actionHandlers, ...actionHandlers};

    // attach lifecycle
    const View = createView(handler, Component);

    // execute lifecycle onReady
    app.store.dispatch(actions.onReady());

    return {
        actions,
        View,
        proxyLifeCycle: (View: ComponentType<any>) => {
            // register next view
            const NextView = createView(handler, View);
            return NextView;
        },
    };
}

/**
 * Module extends Model
 */
export class Model<State extends {} = {}> extends createModel(app)<State> {
    setHistory(newURL: string) {
        app.store.dispatch(push(newURL));
    }
}

/**
 * Listen global error
 */
function listenGlobalError() {
    window.onerror = (message: string | Event, source?: string, line?: number, column?: number, error?: Error): void => {
        console.error("Window Global Error");
        if (!error) {
            error = new Error(message.toString());
        }
        app.store.dispatch(setErrorAction(error));
    };
}

/**
 * Redux DevTools plug-in support
 * Ref: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
 * @param enhancer
 */
function devtools(enhancer: StoreEnhancer): StoreEnhancer {
    const extension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
    if (extension) {
        return compose(enhancer, extension({}));
    }
    return enhancer;
}
