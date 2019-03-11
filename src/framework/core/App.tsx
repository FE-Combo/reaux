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
import {Model, ActionStore, setStateAction, saga, storeListener, rootReducer, setErrorAction} from "./redux";
import {getPrototypeOfExceptConstructor} from "../util/object";
import {AppView, StateView, ActionTypeView} from "./type";

console.time("[framework] initialized");

function createApp(): AppView {
    const history = createBrowserHistory();
    const actionStore = new ActionStore();
    const sagaMiddleware = createSagaMiddleware();
    const reducer: Reducer<StateView> = rootReducer(connectRouter(history));
    const store: Store<StateView> = createStore(reducer, devtools(applyMiddleware(routerMiddleware(history), sagaMiddleware)));
    store.subscribe(storeListener(store));
    sagaMiddleware.run(saga, actionStore);
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

    return {history, store, sagaMiddleware, actionStore, modules: {}};
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

export function register<H extends Model<any>>(handler: H, Component: ComponentType<any>): any {
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
    keys.forEach(actionType => {
        const method = handler[actionType];
        const qualifiedActionType = `${moduleName}/${actionType}`;
        app.actionStore.actionType[actionType] = (...payload: any[]): ActionTypeView<any[]> => ({type: qualifiedActionType, payload});
        app.actionStore.actionHandler[qualifiedActionType] = method.bind(handler);
    });

    class ProxyComponent<P extends {} = {}> extends React.PureComponent<P> {
        constructor(props: P) {
            super(props);
            if (app.actionStore.actionType.onReady) {
                app.store.dispatch(app.actionStore.actionType.onReady());
            }
        }

        componentDidMount() {
            if (app.actionStore.actionType.onLoad) {
                app.store.dispatch(app.actionStore.actionType.onLoad());
            }
        }

        componentDidUpdate(prevProps: Readonly<P>) {
            const prevLocation = (prevProps as any).location;
            const currentLocation = (this.props as any).location;
            const currentRouteParams = (this.props as any).match ? (this.props as any).match.params : null;
            if (currentLocation && currentRouteParams && prevLocation !== currentLocation && app.actionStore.actionType.onLoad) {
                // Only trigger if current component is connected to <Route> and call Handler's setHistory
                app.store.dispatch(app.actionStore.actionType.onLoad());
            }
        }

        componentWillUnmount() {
            if (app.actionStore.actionType.onUnload) {
                app.store.dispatch(app.actionStore.actionType.onUnload());
            }
        }

        render() {
            return <Component {...this.props} />;
        }
    }

    return {View: ProxyComponent, Controller: app.actionStore.actionType};
}
