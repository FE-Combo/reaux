import React, {ComponentType} from "react";
import {AppRegistry} from "react-native";
import {Reducer, compose, StoreEnhancer, Store, applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import createSagaMiddleware from "redux-saga";
import {createReducer, ErrorBoundary, setErrorAction, setStateAction, createCView, createAction, createApp, AppView, StateView, ErrorHandler, modelInjection, BaseOnGeneratorModel, BaseOnPromiseModel, BaseModel, pMiddleware, gMiddleware, ModelType, saga, LOADING_ACTION} from "reaux";

declare const window: any;

type State = StateView;

interface App extends AppView {
    store: Store<State>;
}

interface RenderOptions {
    name: string;
    Component: ComponentType<any>;
    onError?: ErrorHandler;
    onInitialized?: () => Promise<any>;
}

const app = generateApp() as App;
modelInjection(app.store.getState(), (moduleName, initState, type) => app.store.dispatch(setStateAction(moduleName, initState, type)));

/**
 * Create reducer, middleware, store, redux-saga, app cache
 */
function generateApp(): App {
    const reducer: Reducer<State> = createReducer(reducers => ({...reducers}));
    const sagaMiddleware = createSagaMiddleware();
    const store: Store<State> = createStore(reducer, devtools(applyMiddleware(sagaMiddleware, pMiddleware, gMiddleware)));
    const app = createApp(app => ({...app, store}));
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
export function register<H extends BaseModel & {type: ModelType}>(handler: H, Component: ComponentType<any>) {
    if (app.modules.hasOwnProperty(handler.moduleName)) {
        throw new Error(`module is already registered, module=${handler.moduleName}`);
    }
    const {actions, actionHandlers} = createAction(handler);
    app.actionHandler = {...app.actionHandler, ...actionHandlers};

    if (handler.type === ModelType.P) {
        app.actionPHandlers = {...app.actionPHandlers, ...actionHandlers};
    } else if (handler.type === ModelType.G) {
        app.actionGHandlers = {...app.actionGHandlers, ...actionHandlers};
    }

    const View = createCView(handler, Component);
    return {View, actions};
}

/**
 * Module extends Generator Model
 */
export class GModel<State extends {} = {}> extends BaseOnGeneratorModel<State> {}

/**
 * Module extends Promise Model
 */
export class PModel<State extends {} = {}> extends BaseOnPromiseModel<State> {}

function listenGlobalError(onError: ErrorHandler) {
    // 对客户端错误行为进行处理(超时/4**)
    ErrorUtils.setGlobalHandler((error: any, isFatal: boolean) => {
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
                actionsBlacklist: [LOADING_ACTION],
            });
        }
    }
    return composeEnhancers(enhancer);
}
