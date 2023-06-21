import React, {ComponentType} from "react";
import {AppRegistry} from "react-native";
import {Reducer, compose, StoreEnhancer, Store, applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import {createReducer, ErrorBoundary, setErrorAction, createView, createAction, createApp, State, BaseModel, middleware as reduxMiddleware, createModel, App, Exception, createModuleReducer, hasOwnLifecycle, ActionType} from "reaux";
import {RenderOptions} from "./type";
import {IOScrollView, InView} from "react-native-intersection-observer";

declare const window: {__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any};

const app = generateApp();

/**
 * Create reducer, middleware, store, app cache
 */
function generateApp(): App {
    const reducer: Reducer<State> = createReducer();
    const store: Store<State> = createStore(reducer, devtools(applyMiddleware(reduxMiddleware(() => app.actionHandlers))));
    const app = createApp(store);
    return app;
}

/**
 * Start react-native render.
 * Project entry, trigger once. e.g: main module.
 * @param options
 */
export function start(options: RenderOptions): void {
    const {name, Component, onError, onInitialized} = options;
    class WrappedAppComponent extends React.PureComponent<{}, {initialized: boolean}> {
        constructor(props: {}) {
            super(props);
            this.state = {initialized: false};
        }

        async componentDidMount() {
            if (typeof onInitialized === "function") {
                await onInitialized();
            }
            this.setState({initialized: true});
        }

        render() {
            return (
                this.state.initialized && (
                    <IOScrollView>
                        <Provider store={app.store}>
                            <ErrorBoundary onError={setErrorAction}>
                                <Component />
                            </ErrorBoundary>
                        </Provider>
                    </IOScrollView>
                )
            );
        }
    }
    AppRegistry.registerComponent(name, () => WrappedAppComponent);
    if (typeof onError === "function") {
        listenGlobalError(onError);
    }
}

/**
 * Register module create View and actions.
 * Trigger in every module.
 * @param handler
 * @param Component
 */
export function register<H extends BaseModel>(handler: H, Component: ComponentType<any>) {
    if (["@error", "@loading"].includes(handler.moduleName)) {
        throw new Error(`The module is a common module and cannot be overwritten, please rename it, module=${handler.moduleName}`);
    }

    // register reducer and init module state
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
            () => app.store.dispatch(actions.onShow()),
            () => app.store.dispatch(actions.onHide())
        );
    } else {
        View = createView(handler, Component);
    }

    // execute lifecycle onReady
    if (hasOwnLifecycle(handler, "onReady")) {
        app.store.dispatch(actions.onReady());
    }

    return {
        View,
        actions,
        proxyLifeCycle: (View: ComponentType) => {
            // register next view
            const NextView = createView(handler, View);
            return NextView;
        },
    };
}

/**
 * Module extends Model
 */
export class Model<State extends {} = {}> extends createModel(app)<State> {}

function listenGlobalError(onError: (error: Exception) => any) {
    // 对客户端错误行为进行处理(超时/4**)
    ErrorUtils.setGlobalHandler((error, isFatal) => {
        if (isFatal) {
            console.info("***** Fatal Error *****");
        }
        app.store.dispatch(setErrorAction(error));
    });
    app.exceptionHandler.onError = onError.bind(app);
}

function devtools(enhancer: StoreEnhancer): StoreEnhancer {
    let composeEnhancers = compose;
    if (process.env.NODE_ENV !== "production") {
        const extension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
        if (extension) {
            composeEnhancers = extension({
                // Ref: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
                actionsBlacklist: [],
            });
        }
    }
    return composeEnhancers(enhancer);
}

export function withIntersectionObserver<T>(Component: ComponentType<T>, onShow: () => ActionType<any[]>, onHide: () => ActionType<any[]>) {
    return class View extends React.PureComponent<T> {
        constructor(props: T) {
            super(props);
        }

        handleChange = (inView: boolean) => {
            if (inView) {
                onShow();
            } else {
                onHide();
            }
        };

        render() {
            return (
                <InView onChange={this.handleChange}>
                    <Component {...this.props} />
                </InView>
            );
        }
    };
}
