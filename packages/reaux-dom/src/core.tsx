import "core-js/stable";
import React, {ComponentType} from "react";
import ReactDOM from "react-dom";
import {withRouter} from "react-router-dom";
import {Reducer, compose, StoreEnhancer, Store, applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import {connectRouter, routerMiddleware, ConnectedRouter, push} from "connected-react-router";
import {createBrowserHistory} from "history";
import createSagaMiddleware from "redux-saga";
import {createReducer, ErrorBoundary, setErrorAction, createView, createAction, createApp, modelInjection, viewInjection, BaseModel, Model, saga, App, createModuleReducer} from "reaux";
import {Helper} from "./helper";
import {StateView, RenderOptions} from "./type";

console.time("[framework] initialized");

const history = createBrowserHistory();
const app = generateApp();
modelInjection(app);
viewInjection(app);

export const helper = new Helper(app);

/**
 * Create history, reducer, middleware, store, redux-saga, app cache
 */
function generateApp(): App {
    const routerReducer = connectRouter(history);
    const asyncReducer = {router: routerReducer};
    const historyMiddleware = routerMiddleware(history);
    const sagaMiddleware = createSagaMiddleware();
    const reducer: Reducer<StateView> = createReducer(asyncReducer as any) as any;
    const store: Store<StateView> = createStore(reducer, devtools(applyMiddleware(historyMiddleware, sagaMiddleware)));
    const app = createApp(store);
    app.asyncReducers = {...app.asyncReducers, ...asyncReducer} as any;
    sagaMiddleware.run(saga, app);
    // TODO:
    // pMiddleware.run(app);
    // gMiddleware.run(app);
    return app;
}

/**
 * Start react-dom render.
 * Project entry, trigger once. e.g: main module.
 * @param options
 */
export function start(options: RenderOptions): void {
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
                <ConnectedRouter history={history}>
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

/**
 * Register module create View and actions.
 * Trigger in every module.
 * @param handler
 * @param view
 */
export function register<H extends BaseModel>(handler: H) {
    if (app.modules.hasOwnProperty(handler.moduleName)) {
        throw new Error(`module is already registered, module=${handler.moduleName}`);
    }
    app.modules[handler.moduleName] = true;

    // register reducer
    const currentModuleReducer = createModuleReducer(handler.moduleName);
    app.asyncReducers[handler.moduleName] = currentModuleReducer;
    app.store.replaceReducer(createReducer(app.asyncReducers));

    // register actions
    const {actions, actionHandlers} = createAction(handler);
    app.actionHandlers = {...app.actionHandlers, ...actionHandlers};
    app.actionPHandlers = {...app.actionPHandlers, ...actionHandlers};
    app.actionGHandlers = {...app.actionGHandlers, ...actionHandlers};

    return {
        actions,
        proxyView: (View: ComponentType<any>) => {
            // register view
            const NextView = createView(handler, actions, View);
            return NextView;
        },
    };
}

/**
 * Module extends Generator Model
 */
export class GModel<State extends {} = {}> extends Model<State> {
    setHistory(newURL: string) {
        app.store.dispatch(push(newURL));
    }
}

/**
 * Module extends Promise Model
 */
export class PModel<State extends {} = {}> extends Model<State> {
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
        return compose(
            enhancer,
            extension({})
        );
    }
    return enhancer;
}
