import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Loadable from "react-loadable";
import {renderToString} from "react-dom/server";
import {withRouter, StaticRouter} from "react-router-dom";
import {Reducer, compose, StoreEnhancer, Store, applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import {connectRouter, routerMiddleware, ConnectedRouter, push} from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import {createReducer, ErrorBoundary, setErrorAction, createView, createAction, createApp, modelInjection, viewInjection, BaseModel, Model, saga, createModuleReducer, dynamicMiddleware, addMiddleware, CompileConfig, RuntimeConfig, createActionType} from "reaux";
import {Helper} from "./helper";
import createHistory from "./routerHistory";
import {StateView, RenderOptions, DOMApp, ServerStartReturn} from "./type";
declare const REAUX_COMPILE_CONFIG: CompileConfig;
declare const REAUX_RUNTIME_CONFIG: RuntimeConfig;
const history = createHistory();
const app = generateApp();
modelInjection(app);
viewInjection(app);
export const helper = new Helper(app);

/**
 * Create history, reducer, middleware, store, redux-saga, app cache
 */
function generateApp(): DOMApp {
    const routerReducer = connectRouter(history);
    const asyncReducer = {router: routerReducer};
    const historyMiddleware = routerMiddleware(history);
    const sagaMiddleware = createSagaMiddleware();
    const reducer: Reducer<StateView> = createReducer(asyncReducer as any) as any;
    const preloadedState = (typeof window !== "undefined" && (window as any)?.__REAUX_DATA__?.ReduxState) || {};
    const store: Store<StateView> = createStore(reducer, preloadedState, devtools(applyMiddleware(historyMiddleware, dynamicMiddleware)));
    const app = createApp(store);
    app.asyncReducers = {...app.asyncReducers, ...asyncReducer} as any;
    addMiddleware(sagaMiddleware);
    sagaMiddleware.run(saga, app);
    // TODO:
    // pMiddleware.run(app);
    // gMiddleware.run(app);
    app.compileConfig = typeof REAUX_COMPILE_CONFIG === "object" ? REAUX_COMPILE_CONFIG : {};
    app.runtimeConfig = typeof REAUX_RUNTIME_CONFIG === "object" ? REAUX_RUNTIME_CONFIG : {};
    return app;
}

/**
 * Start client react-dom render.
 * Project entry, trigger once. e.g: main module.
 * @param options
 */
export function start(options: RenderOptions): ServerStartReturn | undefined {
    const {Component, onError, onInitialized, url = "/"} = options;
    const WithRouterComponent = withRouter(Component);
    const Application = () => (
        <Provider store={app.store!}>
            <ErrorBoundary setErrorAction={setErrorAction}>
                {app.isServer ? (
                    <StaticRouter location={url} context={{}}>
                        <WithRouterComponent />
                    </StaticRouter>
                ) : (
                    <ConnectedRouter history={history}>
                        <WithRouterComponent />
                    </ConnectedRouter>
                )}
            </ErrorBoundary>
        </Provider>
    );

    if (app.isServer) {
        const mainModuleName = (Component as any).moduleName;
        if (!app.serverRenderedModules.includes(mainModuleName)) {
            app.serverRenderedModules.push(mainModuleName);
        }
        const content = renderToString(<Application />);
        const reduxState = app.store.getState();
        reduxState.router.location.pathname = url;
        return {content, serverRenderedModules: app.serverRenderedModules, reduxState};
    } else {
        if (typeof onError === "function") {
            app.exceptionHandler.onError = onError.bind(app);
        }
        listenGlobalError();
        const rootElement = document.getElementById("reaux-app-root");
        const renderCallback = () => {
            if (typeof onInitialized === "function") {
                onInitialized();
            }
        };
        if (app.compileConfig?.isSSR) {
            Loadable.preloadReady().then(() => {
                ReactDOM.hydrate(<Application />, rootElement, renderCallback);
            });
        } else {
            ReactDOM.render(<Application />, rootElement, renderCallback);
        }
    }
    return;
}

/**
 * Register module create View and actions.
 * Trigger in every module.
 * @param handler
 * @param view
 */
export function register<H extends BaseModel>(handler: H): any {
    if (app.modules.hasOwnProperty(handler.moduleName)) {
        throw new Error(`module is already registered, module=${handler.moduleName}`);
    }
    app.modules[handler.moduleName] = 0;

    // register reducer
    const currentModuleReducer = createModuleReducer(handler.moduleName);
    app.asyncReducers[handler.moduleName] = currentModuleReducer;
    app.store.replaceReducer(createReducer(app.asyncReducers));

    // initState can store on the client, but it will be lost on the server
    if (app.isServer) {
        app.store.dispatch({type: createActionType(handler.moduleName), payload: handler.initState});
    }

    // register actions
    const {actions, actionHandlers} = createAction(handler);
    app.actionHandlers = {...app.actionHandlers, ...actionHandlers};
    app.actionPHandlers = {...app.actionPHandlers, ...actionHandlers};
    app.actionGHandlers = {...app.actionGHandlers, ...actionHandlers};

    return {
        actions,
        proxyView: (View: React.ComponentType<any>) => {
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
    if (typeof window !== "undefined") {
        window.onerror = (message: string | Event, source?: string, line?: number, column?: number, error?: Error): void => {
            console.error("Window Global Error");
            if (!error) {
                error = new Error(message.toString());
            }
            app.store.dispatch(setErrorAction(error));
        };
    }
}

/**
 * Redux DevTools plug-in support
 * Ref: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
 * @param enhancer
 */
function devtools(enhancer: StoreEnhancer): StoreEnhancer {
    if (typeof window !== "undefined") {
        const extension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
        if (extension) {
            return compose(enhancer, extension({}));
        }
    }
    return enhancer;
}
