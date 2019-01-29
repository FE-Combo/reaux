import {History} from "history";
import {Action, Store} from "redux";
import {SagaMiddleware} from "redux-saga";
import {Actor} from "./handler";
import {RouterState} from "connected-react-router";
import {LoadingStateView} from "./type";

export interface StateView {
    router: RouterState;
    loading: LoadingStateView;
    app: {};
}

export interface ActionView<P> extends Action {
    name?: string;
    payload: P;
}

export interface AppView {
    readonly store: Store<StateView>;
    readonly history: History;
    readonly sagaMiddleware: SagaMiddleware<any>;
    readonly actor: Actor;
    readonly modules: {[module: string]: boolean};
}

export interface LoadingStateView {
    [loading: string]: number; // there may be multiple effects listen to it, hide loading component when status === 0
}
