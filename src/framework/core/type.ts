import {History} from "history";
import {Action, Store} from "redux";
import {SagaMiddleware} from "redux-saga";
import {RouterState} from "connected-react-router";
import {LoadingStateView} from "./type";
import {SagaIterator} from "redux-saga";
import {Exception} from "./exception";

export interface StateView {
    router: RouterState;
    loading: LoadingStateView;
    app: {};
}

export interface ActionTypeView<P> extends Action {
    name?: string;
    payload: P;
}

export type ActionHandler = (...args: any[]) => SagaIterator;

export interface AppView {
    readonly store: Store<StateView>;
    readonly history: History;
    readonly sagaMiddleware: SagaMiddleware<any>;
    readonly actionHandler: {[type: string]: ActionHandler};
    readonly modules: {[module: string]: number};
    errorHandler: ErrorHandler | null;
}

export interface StateActionPayloadView {
    module: string;
    state: any;
}

export interface LoadingActionView {
    identifier: string;
    hasShow: boolean;
}

export interface LoadingStateView {
    [loading: string]: number; // there may be multiple effects listen to it, hide loading component when status === 0
}

export type ErrorHandler = (error: Exception) => SagaIterator;
