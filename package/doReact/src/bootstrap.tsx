import React, {ComponentType} from "react";
import ReactDOM from "react-dom";
import {withRouter} from "react-router-dom";
import {applyMiddleware, createStore, Reducer, Store, compose, StoreEnhancer} from "redux";
import {Provider} from "react-redux";
import createSagaMiddleware, {SagaIterator} from "redux-saga";
import {put} from "redux-saga/effects";
import {connectRouter, routerMiddleware, ConnectedRouter, RouterState, push} from "connected-react-router";
import {createBrowserHistory, History} from "history";
import {rootReducer} from "../../shared/redux/reducer";
import {saga} from "../../shared/redux/saga";
import ErrorBoundary from "../../shared/component/ErrorBoundary";
import {ErrorListener} from "../../shared/util/exception";
import {setErrorAction, setStateAction} from "../../shared/redux/action";
import {getPrototypeOfExceptConstructor} from "../../shared/tool/object";
import {ActionTypeView, LifeCycleListener, ActionHandler, BaseAppView, BaseStateView} from "../../shared/type";

type StateView = BaseStateView<RouterState>;
type AppView = BaseAppView<History, RouterState>;

// 1.new () 代表是一个class 2.new 中参数为初始参数 Model(module/initialState) 3.Model<{}> & ErrorListener 代表 class 的继承
declare type ErrorHandlerModuleClass = new (name: string, state: {}) => Model<{}> & ErrorListener;
interface RenderOptions {
    Component: ComponentType<any>;
    ErrorHandlerModule: ErrorHandlerModuleClass;
    onInitialized: (() => void) | null;
}

console.time("[framework] initialized");

function createApp(): AppView {
    const history = createBrowserHistory();
    const actionHandler: {[type: string]: ActionHandler} = {};
    const sagaMiddleware = createSagaMiddleware();
    const reducer: Reducer<StateView> = rootReducer(connectRouter(history));
    const store: Store<StateView> = createStore(reducer, devtools(applyMiddleware(routerMiddleware(history), sagaMiddleware)));
    sagaMiddleware.run(saga, app);
    return {history, store, sagaMiddleware, actionHandler, modules: {}, errorHandler: null};
}

const app = createApp();

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

export function register<H extends Model<any>>(handler: H, Component: ComponentType<any>): any {
    // Trigger every module.
    if (app.modules.hasOwnProperty(handler.module)) {
        throw new Error(`module is already registered, module=${handler.module}`);
    }

    const actions = createActions(handler);
    const View = createView(handler, Component, actions);

    return {View, actions};
}

export class Model<S extends object> implements LifeCycleListener {
    public constructor(public readonly module: string, private readonly initialState: S) {
        // 存储初始化 State 到 redux
        app.store.dispatch(setStateAction(module, initialState, `@@${module}/initState`));
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

    protected get state(): Readonly<S> {
        return app.store.getState().app[this.module];
    }

    protected get rootState(): Readonly<StateView> {
        return app.store.getState();
    }

    protected *setState(newState: Partial<S>): SagaIterator {
        yield put(setStateAction(this.module, newState, `@@${this.module}/setState[${Object.keys(newState).join(",")}]`));
    }

    protected *setHistory(newURL: string): SagaIterator {
        yield put(push(newURL));
    }
}

function createView<H extends Model<any>>(handler: H, Component: React.ComponentType<any>, actions: {[type: string]: (...payload: any[]) => ActionTypeView<any[]>}) {
    return class ProxyView<P extends {} = {}> extends React.PureComponent<P> {
        constructor(props: P) {
            super(props);

            if ((handler.onReady as any).isLifecycle) {
                app.store.dispatch(actions.onReady());
            }
        }

        componentDidMount() {
            if ((handler.onLoad as any).isLifecycle) {
                app.store.dispatch(actions.onLoad());
            }
        }

        componentDidUpdate(prevProps: Readonly<P>) {
            const prevLocation = (prevProps as any).location;
            const currentLocation = (this.props as any).location;
            const currentRouteParams = (this.props as any).match ? (this.props as any).match.params : null;
            if (currentLocation && currentRouteParams && prevLocation !== currentLocation && (handler.onLoad as any).isLifecycle) {
                // Only trigger if current component is connected to <Route> and call Handler's setHistory
                app.store.dispatch(actions.onLoad());
            }
        }

        componentWillUnmount() {
            if (actions.onUnload) {
                app.store.dispatch(actions.onUnload());
            }
        }

        render() {
            return <Component {...this.props} />;
        }
    };
}

function createActions<H extends Model<any>>(handler: H) {
    // 1.return actions(存储方法名与方法参数)、2.存储方法对应逻辑
    const moduleName = handler.module;
    const keys = getPrototypeOfExceptConstructor(handler);
    const actions: {[type: string]: (...payload: any[]) => ActionTypeView<any[]>} = {};
    keys.forEach(actionType => {
        const method = handler[actionType];
        const qualifiedActionType = `${moduleName}/${actionType}`;
        app.actionHandler[qualifiedActionType] = method.bind(handler);
        actions[actionType] = (...payload: any[]): ActionTypeView<any[]> => ({type: qualifiedActionType, payload});
    });
    return actions;
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
