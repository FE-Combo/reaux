import React, {ComponentType} from "react";
import ReactDOM from "react-dom";
import {withRouter} from "react-router-dom";
import {Reducer, compose, StoreEnhancer} from "redux";
import {Provider} from "react-redux";
import {connectRouter, routerMiddleware, ConnectedRouter, RouterState, push} from "connected-react-router";
import {createBrowserHistory, History} from "history";
import {rootReducer, ErrorBoundary, setErrorAction, setStateAction, createView, createLogicActions, createApp} from "../../shared/src/index";
import {BaseAppView, BaseStateView, BaseModel, ErrorHandler} from "../../shared/src/type";
import {SagaIterator} from "redux-saga";

console.time("[framework] initialized");

type StateView = BaseStateView<RouterState>;
type AppView = BaseAppView<History, RouterState>;

interface RenderOptions {
    Component: ComponentType<any>;
    onError: ErrorHandler;
    onInitialized: (() => void) | null;
}

const history = createBrowserHistory();
const reducer: Reducer<StateView> = rootReducer(connectRouter(history));
const historyMiddleware = routerMiddleware(history);
const app: AppView = createApp(app => ({...app, history}), reducer, devtools, historyMiddleware);

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
    listenGlobalError(options.onError);
}

export function register<H extends BaseModel<{}>>(handler: H, Component: ComponentType<any>) {
    // Trigger every module.
    if (app.modules.hasOwnProperty(handler.moduleName)) {
        throw new Error(`module is already registered, module=${handler.moduleName}`);
    }
    const actions = createLogicActions(app, handler);
    const View = createView(app, handler, Component, actions);
    return {View, actions};
}

export class Model<State extends object = {}> implements BaseModel<State> {
    public constructor(readonly moduleName: string, readonly initState: State) {
        // 存储初始化 State 到 redux
        // super(moduleName, initialState);
        app.store.dispatch(setStateAction(moduleName, initState, `@@${moduleName}/initState`));
    }

    *onReady(): SagaIterator {
        // extends to be overrode
    }

    *onLoad(): SagaIterator {
        // extends to be overrode
    }

    *onUnload(): SagaIterator {
        // extends to be overrode
    }

    *onHide(): SagaIterator {
        // extends to be overrode
    }

    get state(): Readonly<State> {
        return app.store.getState().app[this.moduleName];
    }

    get rootState(): Readonly<BaseStateView> {
        return app.store.getState();
    }

    setState(newState: Partial<State>) {
        app.store.dispatch(setStateAction(this.moduleName, newState, `@@${this.moduleName}/setState[${Object.keys(newState).join(",")}]`));
    }

    /** custom function */
    setHistory(newURL: string) {
        app.store.dispatch(push(newURL));
    }
}

function listenGlobalError(onError: ErrorHandler) {
    // 对客户端错误行为进行处理(超时/4**)
    window.onerror = (message: string | Event, source?: string, line?: number, column?: number, error?: Error): void => {
        console.error("Window Global Error");
        if (!error) {
            error = new Error(message.toString());
        }
        app.store.dispatch(setErrorAction(error));
    };

    app.errorHandler = onError.bind(app);
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
