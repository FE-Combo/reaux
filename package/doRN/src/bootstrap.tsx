import React, {ComponentType} from "react";
import {AppRegistry} from "react-native";
import {compose, StoreEnhancer} from "redux";
import {Provider} from "react-redux";
import {ErrorBoundary, setErrorAction, LOADING_ACTION, createView, createLogicActions, rootReducer, createApp, setStateAction} from "../../shared";
import {BaseAppView, BaseStateView, BaseModel} from "../../shared/type";
import {SagaIterator} from "redux-saga";

declare const window: any;

type StateView = BaseStateView;
type AppView = BaseAppView;

interface RenderOptions {
    name: string;
    Component: ComponentType<any>;
    onError: () => SagaIterator;
    onInitialized: () => Promise<any>;
}

const app: AppView = createApp(app => app, rootReducer(), devtools);

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
    listenGlobalError(options.onError);
}

export function register<H extends BaseModel<{}>>(handler: H, Component: ComponentType<any>): any {
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
}

function listenGlobalError(onError: () => SagaIterator) {
    // 对客户端错误行为进行处理(超时/4**)
    ErrorUtils.setGlobalHandler((error, isFatal) => {
        if (isFatal) {
            console.info("***** Fatal Error *****");
        }
        app.store.dispatch(setErrorAction(error));
    });
    app.errorHandler = onError.bind(app);
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
