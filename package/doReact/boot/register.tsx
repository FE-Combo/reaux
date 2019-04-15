import React, {ComponentType} from "react";
import app from "./app";
import {push} from "connected-react-router";
import {SagaIterator} from "redux-saga";
import {put} from "redux-saga/effects";
import {ActionTypeView, StateView} from "../type";
import {setStateAction} from "../redux/action";
import {getPrototypeOfExceptConstructor} from "../tool/object";

export abstract class LifeCycleListener {
    abstract onReady(): SagaIterator;
    abstract onLoad(): SagaIterator;
    abstract onUnload(): SagaIterator;
    abstract onHide(): SagaIterator;
}

export function register<H extends Model<any>>(handler: H, Component: ComponentType<any>): any {
    // Trigger every module.
    if (app.modules.hasOwnProperty(handler.module)) {
        throw new Error(`module is already registered, module=${handler.module}`);
    }
    app.modules[handler.module] = 1;

    const Controller = createController(handler);
    const View = createView(handler, Component, Controller);

    return {View, Controller};
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

function createView<H extends Model<any>>(handler: H, Component: React.ComponentType<any>, Controller: {[type: string]: (...payload: any[]) => ActionTypeView<any[]>}) {
    return class ProxyView<P extends {} = {}> extends React.PureComponent<P> {
        constructor(props: P) {
            super(props);

            if ((handler.onReady as any).isLifecycle) {
                app.store.dispatch(Controller.onReady());
            }
        }

        componentDidMount() {
            if ((handler.onLoad as any).isLifecycle) {
                app.store.dispatch(Controller.onLoad());
            }
        }

        componentDidUpdate(prevProps: Readonly<P>) {
            const prevLocation = (prevProps as any).location;
            const currentLocation = (this.props as any).location;
            const currentRouteParams = (this.props as any).match ? (this.props as any).match.params : null;
            if (currentLocation && currentRouteParams && prevLocation !== currentLocation && (handler.onLoad as any).isLifecycle) {
                // Only trigger if current component is connected to <Route> and call Handler's setHistory
                app.store.dispatch(Controller.onLoad());
            }
        }

        componentWillUnmount() {
            if (Controller.onUnload) {
                app.store.dispatch(Controller.onUnload());
            }
        }

        render() {
            return <Component {...this.props} />;
        }
    };
}

function createController<H extends Model<any>>(handler: H) {
    // 1.return Controller(存储方法名与方法参数)、2.存储方法对应逻辑
    const moduleName = handler.module;
    const keys = getPrototypeOfExceptConstructor(handler);
    const Controller: {[type: string]: (...payload: any[]) => ActionTypeView<any[]>} = {};
    keys.forEach(actionType => {
        const method = handler[actionType];
        const qualifiedActionType = `${moduleName}/${actionType}`;
        app.actionHandler[qualifiedActionType] = method.bind(handler);
        Controller[actionType] = (...payload: any[]): ActionTypeView<any[]> => ({type: qualifiedActionType, payload});
    });
    return Controller;
}
