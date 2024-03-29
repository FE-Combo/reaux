import "core-js/stable";
import React, {ComponentType} from "react";
import {createRoot} from "react-dom/client";
import {Reducer, compose, StoreEnhancer, Store, applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import {connectRouter, routerMiddleware, ConnectedRouter, push} from "connected-react-router";
import {LocationDescriptorObject, createBrowserHistory, History} from "history";
import {InView, ObserverInstanceCallback} from "react-intersection-observer";
import {State as ReauxState, createReducer, ErrorBoundary, createView, createAction, setModuleAction, createApp, BaseModel, createModel, App, createModuleReducer, promiseMiddleware, hasOwnLifecycle, ActionType, dynamicMiddleware, dynamicAddMiddleware} from "reaux";
import {Helper} from "./helper";
import {StateView, RenderOptions} from "./type";

declare global {
    interface Window {
        __REDUX__STORE__: any;
    }
}

const app = generateApp();

export const helper = new Helper(app);

/**
 * Create history, reducer, middleware, store, app cache
 */
function generateApp(): App {
    const asyncReducer = {};
    const reducer = createReducer(asyncReducer) as unknown as Reducer<StateView>;
    const store: Store<StateView> = createStore(
        reducer,
        devtools(
            applyMiddleware(
                promiseMiddleware(() => app.actionHandlers),
                dynamicMiddleware
            )
        )
    );

    window.__REDUX__STORE__ = store;

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
    const {name, Component, onError, onUnhandledRejection, container = true, historyMode = {type: "browserHistory"}, fallback} = options;

    if (typeof onError === "function") {
        app.exceptionHandler.onError = onError.bind(app);
    }

    if (typeof onUnhandledRejection === "function") {
        app.exceptionHandler.onUnhandledRejection = onUnhandledRejection.bind(app);
    }

    listenGlobalError();

    let history: History<unknown> | null = null;
    // create browser history
    if (historyMode?.type === "browserHistory") {
        history = createBrowserHistory(historyMode.options);
        const routerReducer = connectRouter(history);
        app.asyncReducers.router = routerReducer;
        app.store.replaceReducer(createReducer(app.asyncReducers));
        const historyMiddleware = routerMiddleware(history);
        dynamicAddMiddleware(historyMiddleware);
    }

    let rootElement: Element | DocumentFragment | undefined;

    if (typeof container === "object") {
        rootElement = container;
    } else {
        if (container) {
            rootElement = document.createElement("div");
            rootElement.id = "framework-app-root";
            document.body.appendChild(rootElement);
        } else {
            throw new Error("Missing container parameter");
        }
    }

    const root = createRoot(rootElement);
    root.render(
        <Provider store={app.store}>
            <ErrorBoundary fallback={fallback}>
                {history ? (
                    <ConnectedRouter history={history}>
                        <Component />
                    </ConnectedRouter>
                ) : (
                    <Component />
                )}
            </ErrorBoundary>
        </Provider>
    );

    if (name) {
        const mountedStyle = "color: green; font-weight: bold;";
        console.info(`%c[${name}] has been mounted`, mountedStyle);
    }

    window.addEventListener("unmount", function () {
        if (name) {
            const unmountedStyle = "color: red; font-weight: bold;";
            console.info(`%c[${name}] has been unmounted`, unmountedStyle);
        }
        root.unmount();
    });
}

/**
 * Register module create View and actions.
 * Trigger in every module.
 * @param handler
 * @param view
 */
export function register<H extends BaseModel, P>(handler: H, Component: ComponentType<P>) {
    if (["@error", "@loading", "router"].includes(handler.moduleName)) {
        throw new Error(`The module is a common module and cannot be overwritten, please rename it, module=${handler.moduleName}`);
    }

    // register reducer and init module state
    const currentModuleReducer = createModuleReducer(handler.moduleName, handler.initialState);

    app.asyncReducers[handler.moduleName] = currentModuleReducer;
    app.store.replaceReducer(createReducer(app.asyncReducers));

    // register actions
    const {actions, actionHandlers} = createAction(handler);
    app.actionHandlers = {...app.actionHandlers, ...actionHandlers};

    // register view, attach lifecycle and viewport observer
    let View: ComponentType<P>;
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
        proxyLifeCycle: function <PP>(View: ComponentType<PP>) {
            // register next view
            const NextView = createView(handler, View) as ComponentType<PP>;
            return NextView;
        },
    };
}

/**
 * Module extends Model
 */
export class Model<State extends {} = {}, R extends ReauxState = StateView> extends createModel(app)<State, R> {
    protected get router() {
        return {
            push(path: LocationDescriptorObject<unknown> | string, state?: unknown) {
                if (typeof path === "string") {
                    app.store.dispatch(push(path, state));
                } else {
                    app.store.dispatch(push(path));
                }
            },
        };
    }
}

/**
 * Listen global error
 */
function listenGlobalError() {
    window.addEventListener(
        "error",
        (event) => {
            if (app.exceptionHandler.onError) {
                app.exceptionHandler.onError(event.error);
            } else {
                console.error("window error:", event.error);
                app.store.dispatch(
                    setModuleAction("@error", {
                        type: event.type,
                        message: event?.error?.message,
                        stack: event?.error?.stack,
                    })
                );
            }
        },
        true
    );

    window.addEventListener(
        "unhandledrejection",
        (event) => {
            if (app.exceptionHandler.onUnhandledRejection) {
                app.exceptionHandler.onUnhandledRejection(event.reason);
            } else {
                console.error("window unhandled promise rejection:", event.reason);
                app.store.dispatch(
                    setModuleAction("@error", {
                        type: event.type,
                        message: event?.reason?.message,
                        stack: event?.reason?.stack,
                    })
                );
            }
        },
        true
    );
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
            extension({
                serialize: {
                    replacer: (_key: string, value: any) => (typeof value === "bigint" ? value.toString() : value),
                },
            })
        );
    }
    return enhancer;
}

export function withIntersectionObserver<T>(Component: ComponentType<T>, onShow: (entry: Parameters<ObserverInstanceCallback>[1]) => ActionType<any[]>, onHide: (entry: Parameters<ObserverInstanceCallback>[1]) => ActionType<any[]>): ComponentType<T> {
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
