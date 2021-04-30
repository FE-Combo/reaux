import React, {ComponentType} from "react";
import {AppRegistry} from "react-native";
import {Reducer, compose, StoreEnhancer, Store, applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import createSagaMiddleware from "redux-saga";
import {createReducer, ErrorBoundary, setErrorAction, createView, createAction, createApp, State, BaseModel, pMiddleware, gMiddleware, saga, Model, App, Exception, createModuleReducer} from "reaux";
import {RenderOptions} from "./type";

declare const window: any;

const app = generateApp();

/**
 * Create reducer, middleware, store, redux-saga, app cache
 */
function generateApp(): App {
    const reducer: Reducer<State> = createReducer();
    const sagaMiddleware = createSagaMiddleware();
    const store: Store<State> = createStore(reducer, devtools(applyMiddleware(sagaMiddleware, pMiddleware, gMiddleware)));
    const app = createApp(store);
    sagaMiddleware.run(saga, app);
    pMiddleware.run(app);
    gMiddleware.run(app);
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
                    <Provider store={app.store}>
                        <ErrorBoundary setErrorAction={setErrorAction}>
                            <Component />
                        </ErrorBoundary>
                    </Provider>
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
export function register<H extends BaseModel>(handler: H, Component: ComponentType) {
    if (app.modules.hasOwnProperty(handler.moduleName)) {
        throw new Error(`module is already registered, module=${handler.moduleName}`);
    }

    // register reducer
    const currentModuleReducer = createModuleReducer(handler.moduleName);
    app.asyncReducers[handler.moduleName] = currentModuleReducer;
    app.store.replaceReducer(createReducer(app.asyncReducers));

    // register actions
    const {actions, actionHandlers} = createAction(handler);
    app.actionHandlers = {...app.actionHandlers, ...actionHandlers};
    app.actionPHandlers = {...app.actionPHandlers, ...actionHandlers};
    app.actionGHandlers = {...app.actionGHandlers, ...actionHandlers};

    // register view
    const View = createView(app, handler, actions, Component);
    return {View, actions};
}

/**
 * Module extends Generator Model
 */
export class GModel<State extends {} = {}> extends Model<State> {}

/**
 * Module extends Promise Model
 */
export class PModel<State extends {} = {}> extends Model<State> {}

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
    if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
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
