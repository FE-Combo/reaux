import {History} from "history";
import {Action, Store} from "redux";
import {SagaMiddleware} from "redux-saga";
import {Actor} from "./redux";
import {RouterState} from "connected-react-router";
import {LoadingStateView} from "./type";
import {Exception} from "./Exception";
import {Action as HistoryAction, Location} from "history";
import {SagaIterator} from "redux-saga";

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

export interface StateActionPayloadView {
    module: string;
    state: any;
}

export interface LoadingActionPayloadView {
    identifier: string;
    hasShow: boolean;
}

export interface LocationChangedEvent {
    location: Location;
    action: HistoryAction;
}

export interface LoadingStateView {
    [loading: string]: number; // there may be multiple effects listen to it, hide loading component when status === 0
}

export type ActionHandler = (...args: any[]) => SagaIterator;

type ActionCreator<H> = H extends (...args: infer P) => SagaIterator ? ((...args: P) => ActionView<P>) : never;
export type HandlerKeys<H> = {[K in keyof H]: H[K] extends (...args: any[]) => SagaIterator ? K : never}[Exclude<keyof H, keyof Listener>];
export type ActionCreators<H> = {readonly [K in HandlerKeys<H>]: ActionCreator<H[K]>};

export interface Listener {
    onInitialized?(): SagaIterator;
    onLocationChanged?(event: LocationChangedEvent): SagaIterator;
    onError?(error: Exception): SagaIterator;
}
