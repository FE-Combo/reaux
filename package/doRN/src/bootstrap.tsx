import React, {ComponentType} from "react";
import {AppRegistry} from "react-native";
import {applyMiddleware, createStore, Reducer, Store, compose, StoreEnhancer} from "redux";
import {Provider} from "react-redux";
import createSagaMiddleware from "redux-saga";
import {ErrorBoundary, ErrorListener, setErrorAction, LOADING_ACTION, createView, createLogicActions, rootReducer, saga, BaseModel, createModel} from "../../shared";
import {ActionHandler, BaseAppView, BaseStateView, ErrorHandler} from "../../shared/type";

let app: AppView;
declare const window: any;

type StateView = BaseStateView;
type AppView = BaseAppView;

// 1.new () 代表是一个class 2.new 中参数为初始参数 BaseModel(module/initialState) 3.BaseModel<{}> & ErrorListener 代表 class 的继承
declare type ErrorHandlerModuleClass = new (name: string, state: {}) => BaseModel<{}> & ErrorListener;
interface RenderOptions {
    name: string;
    Component: ComponentType<any>;
    ErrorHandlerModule: ErrorHandlerModuleClass;
    onInitialized: () => Promise<any>;
}

function createApp(): AppView {
    const actionHandler: {[type: string]: ActionHandler} = {};
    const sagaMiddleware = createSagaMiddleware();
    const reducer: Reducer<StateView> = rootReducer();
    const store: Store<StateView> = createStore(reducer, devtools(applyMiddleware(sagaMiddleware)));
    const errorHandler: ErrorHandler | null = null;
    sagaMiddleware.run(saga, actionHandler, errorHandler);
    return {store, sagaMiddleware, actionHandler, modules: {}, errorHandler};
}

app = createApp();
export const Model = createModel(app);

export function start(options: RenderOptions): void {
    class WrappedAppComponent extends React.PureComponent<{}, {initialized: boolean}> {
        constructor(props: {}) {
            super(props);
            this.state = {initialized: false};
        }

        async componentDidMount() {
            if (options.onInitialized) {
                await options.onInitialized();
            }
            this.setState({initialized: true});
        }

        render() {
            const Component = options.Component;
            return (
                this.state.initialized && (
                    <Provider store={app.store}>
                        <ErrorBoundary>
                            <Component />
                        </ErrorBoundary>
                    </Provider>
                )
            );
        }
    }
    AppRegistry.registerComponent(options.name, () => WrappedAppComponent);
    listenGlobalError(options.ErrorHandlerModule);
}

export function register<H extends BaseModel<any>>(handler: H, Component: ComponentType<any>): any {
    // Trigger every module.
    if (app.modules.hasOwnProperty(handler.moduleName)) {
        throw new Error(`module is already registered, module=${handler.moduleName}`);
    }

    const actions = createLogicActions(app, handler);
    const View = createView(app, handler, Component, actions);

    return {View, actions};
}

function listenGlobalError(ErrorHandlerModule: ErrorHandlerModuleClass) {
    // 对客户端错误行为进行处理(超时/4**)
    ErrorUtils.setGlobalHandler((error, isFatal) => {
        if (isFatal) {
            console.info("***** Fatal Error *****");
        }
        app.store.dispatch(setErrorAction(error));
    });
    const errorHandler = new ErrorHandlerModule("errorHandler", {});
    app.errorHandler = errorHandler.onError.bind(errorHandler);
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
