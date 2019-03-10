import {ConnectedRouter, connectRouter, routerMiddleware} from "connected-react-router";
import {createBrowserHistory} from "history";
import React, {ComponentType} from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {withRouter} from "react-router-dom";
import {applyMiddleware, createStore, Reducer, Store} from "redux";
import createSagaMiddleware from "redux-saga";
import ErrorBoundary from "../component/ErrorBoundary";
import {devtools} from "../util/devtools";
import {Handler, ActionPayloadStore, setStateAction, saga, storeListener, rootReducer, setErrorAction} from "./redux";
import {getPrototypeOfExceptConstructor} from "../util/object";
import {AppView, StateView, ActionView} from "./type";

console.time("[framework] initialized");

function createApp(): AppView {
    const history = createBrowserHistory();
    const actionPayloadStore = new ActionPayloadStore();
    const sagaMiddleware = createSagaMiddleware();
    const reducer: Reducer<StateView> = rootReducer(connectRouter(history));
    const store: Store<StateView> = createStore(reducer, devtools(applyMiddleware(routerMiddleware(history), sagaMiddleware)));
    store.subscribe(storeListener(store));
    sagaMiddleware.run(saga, actionPayloadStore);
    window.onerror = (message: string | Event, source?: string, line?: number, column?: number, error?: Error): void => {
        console.error("Window Global Error");
        console.error(`Message: ${message.toString()}`);
        if (error) {
            console.error(error);
        }
        if (source && line && column) {
            console.error(`Source: ${source} (${line}, ${column})`);
        }
        if (!error) {
            error = new Error(message.toString());
        }
        store.dispatch(setErrorAction(error));
    };

    // TODO: rename actionPayloadStore to actionHandler
    return {history, store, sagaMiddleware, actionPayloadStore, modules: {}};
}
const app = createApp();

export function render(Component: ComponentType<any>, onInitialized: null | (() => void) = null): void {
    const rootElement: HTMLDivElement = document.createElement("div");
    rootElement.id = "framework-app-root";
    document.body.appendChild(rootElement);
    const WithRouterComponent = withRouter(Component);
    ReactDOM.render(
        <Provider store={app.store}>
            <ErrorBoundary>
                <ConnectedRouter history={app.history}>
                    <WithRouterComponent />
                </ConnectedRouter>
            </ErrorBoundary>
        </Provider>,
        rootElement,
        () => {
            console.timeEnd("[framework] initialized");
            if (typeof onInitialized === "function") {
                onInitialized();
            }
        }
    );
}

export function register<H extends Handler<any>>(handler: H, Component: ComponentType<any>): any {
    // Each module needs to load.
    if (app.modules.hasOwnProperty(handler.module)) {
        throw new Error(`module is already registered, module=${handler.module}`);
    }
    app.modules[handler.module] = 1;

    // 存储初始化 State 到 redux
    app.store.dispatch(setStateAction(handler.module, (handler as any) /* "as any" to get private-readonly initialState */.initialState, `@@${handler.module}/initState`));

    // 1.存储方法名与参数、2.存储方法对应逻辑
    const moduleName = handler.module;
    const keys = getPrototypeOfExceptConstructor(handler);
    const actions: any = {};
    keys.forEach(actionType => {
        const method = handler[actionType];
        const qualifiedActionType = `${moduleName}/${actionType}`;
        actions[actionType] = (...payload: any[]): ActionView<any[]> => ({type: qualifiedActionType, payload});
        app.actionPayloadStore[qualifiedActionType] = method.bind(handler);
    });

    class Main<P extends {} = {}> extends React.PureComponent<P> {
        constructor(props: P) {
            super(props);
            if (actions.onReady) {
                app.store.dispatch(actions.onReady());
            }
        }

        componentDidMount() {
            if (actions.onLoad) {
                app.store.dispatch(actions.onLoad());
            }
        }

        componentDidUpdate(prevProps: Readonly<P>) {
            if (actions.onLoad) {
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
    }

    return {Main, actions};
}
