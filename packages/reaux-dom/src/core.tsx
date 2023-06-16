import "core-js/stable";
import React, {ComponentType} from "react";
import {createRoot} from "react-dom/client";
import {Reducer, compose, StoreEnhancer, Store, applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import {connectRouter, routerMiddleware, ConnectedRouter, push} from "connected-react-router";
import {LocationDescriptorObject, createBrowserHistory} from "history";
import {InView, ObserverInstanceCallback} from "react-intersection-observer";
import {State as ReauxState, createReducer, ErrorBoundary, setErrorAction, createView, createAction, createApp, BaseModel, createModel, App, createModuleReducer, middleware as reduxMiddleware, hasOwnLifecycle, ActionType} from "reaux";
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
    if (["@error", "@loading", "router"].includes(handler.moduleName)) {
        throw new Error(`The module is a common module and cannot be overwritten, please rename it, module=${handler.moduleName}`);
    }

    // register reducer
    const currentModuleReducer = createModuleReducer(handler.moduleName, handler.initState);

    app.asyncReducers[handler.moduleName] = currentModuleReducer;
    app.store.replaceReducer(createReducer(app.asyncReducers));

    // register actions
    const {actions, actionHandlers} = createAction(handler);
    app.actionHandlers = {...app.actionHandlers, ...actionHandlers};

    // register view, attach lifecycle and viewport observer
    let View;
    if (hasOwnLifecycle(handler, "onShow") || hasOwnLifecycle(handler, "onHide")) {
        View = withIntersectionObserver(
            createView(handler, Component),
            (entry: Parameters<ObserverInstanceCallback>[1]) => app.store.dispatch(actions.onShow(entry)),
            (entry: Parameters<ObserverInstanceCallback>[1]) => app.store.dispatch(actions.onHide(entry))
        );
    } else {
        View = createView(handler, Component);
    }

    // execute lifecycle onReady
    if (hasOwnLifecycle(handler, "onReady")) {
        app.store.dispatch(actions.onReady());
    }

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
export class Model<State extends {} = {}, R extends ReauxState = StateView> extends createModel(app)<State, R> {
    push(path: LocationDescriptorObject<unknown> | string, state?: unknown) {
        if (typeof path === "string") {
            app.store.dispatch(push(path, state));
        } else {
            app.store.dispatch(push(path));
        }
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

export function withIntersectionObserver<T>(Component: ComponentType<T>, onShow: (entry: Parameters<ObserverInstanceCallback>[1]) => ActionType<any[]>, onHide: (entry: Parameters<ObserverInstanceCallback>[1]) => ActionType<any[]>) {
    return class View extends React.PureComponent<T> {
        constructor(props: T) {
            super(props);
        }

        handleChange: ObserverInstanceCallback = (inView, entry) => {
            if (inView) {
                onShow(entry);
            } else {
                onHide(entry);
            }
        };

        render() {
            return (
                <InView onChange={this.handleChange}>
                    {({ref}) => (
                        <div ref={ref}>
                            <Component {...this.props} />
                        </div>
                    )}
                </InView>
            );
        }
    };
}
