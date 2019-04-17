import React, {ComponentType} from "react";
import ReactDOM from "react-dom";
import {withRouter} from "react-router-dom";
import {applyMiddleware, createStore, Reducer, Store, compose, StoreEnhancer} from "redux";
import {Provider} from "react-redux";
import createSagaMiddleware from "redux-saga";
import {connectRouter, routerMiddleware, ConnectedRouter, RouterState, push} from "connected-react-router";
import {createBrowserHistory, History} from "history";
import {saga, rootReducer, ErrorBoundary, ErrorListener, setErrorAction, createModel, createView, BaseModel, createLogicActions} from "../../shared";
import {ActionHandler, BaseAppView, BaseStateView, ErrorHandler} from "../../shared/type";

console.time("[framework] initialized");

type StateView = BaseStateView<RouterState>;
type AppView = BaseAppView<History, RouterState>;

// 1.new () 代表是一个class 2.new 中参数为初始参数 Model(module/initialState) 3.Model & ErrorListener 代表 class 的继承
declare type ErrorHandlerModuleClass = new (name: string, state: {}) => BaseModel<{}> & ErrorListener;
interface RenderOptions {
    Component: ComponentType<any>;
    ErrorHandlerModule: ErrorHandlerModuleClass;
    onInitialized: (() => void) | null;
}

function createApp(): AppView {
    const history = createBrowserHistory();
    const actionHandler: {[type: string]: ActionHandler} = {};
    const sagaMiddleware = createSagaMiddleware();
    const routeReducer = connectRouter(history);
    const reducer: Reducer<StateView> = rootReducer(routeReducer);
    const store: Store<StateView> = createStore(reducer, devtools(applyMiddleware(routerMiddleware(history), sagaMiddleware)));
    const errorHandler: ErrorHandler | null = null;
    sagaMiddleware.run(saga, actionHandler, errorHandler);
    return {history, store, sagaMiddleware, actionHandler, modules: {}, errorHandler};
}

const app = createApp();

export const Model = createModel(app, push);

export function start(options: RenderOptions): void {
    // Whole project trigger once(main module).
    const rootElement: HTMLDivElement = document.createElement("div");
    rootElement.id = "framework-app-root";
    document.body.appendChild(rootElement);
    const WithRouterComponent = withRouter(options.Component);
    ReactDOM.render(
        <Provider store={app.store}>
            <ErrorBoundary>
                <ConnectedRouter history={app.history!}>
                    <WithRouterComponent />
                </ConnectedRouter>
            </ErrorBoundary>
        </Provider>,
        rootElement,
        () => {
            console.timeEnd("[framework] initialized");
            if (typeof options.onInitialized === "function") {
                options.onInitialized();
            }
        }
    );
    listenGlobalError(options.ErrorHandlerModule);
}

export function register<H extends BaseModel<{}>>(handler: H, Component: ComponentType<any>): any {
    // Trigger every module.
    if (app.modules.hasOwnProperty(handler.module)) {
        throw new Error(`module is already registered, module=${handler.module}`);
    }

    const actions = createLogicActions(app, handler);
    const View = createView(app, handler, Component, actions);

    return {View, actions};
}

function listenGlobalError(ErrorHandlerModule: ErrorHandlerModuleClass) {
    // 对客户端错误行为进行处理(超时/4**)
    window.onerror = (message: string | Event, source?: string, line?: number, column?: number, error?: Error): void => {
        console.error("Window Global Error");
        if (!error) {
            error = new Error(message.toString());
        }
        app.store.dispatch(setErrorAction(error));
    };

    const errorHandler = new ErrorHandlerModule("errorHandler", {});
    app.errorHandler = errorHandler.onError.bind(errorHandler);
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
