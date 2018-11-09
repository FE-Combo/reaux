import {History} from "history";
import {Action as ReduxAction, Store} from "redux";
import {SagaMiddleware} from "redux-saga";
import {State} from "./state";
import {Actor} from "./handler";

export interface Action<P> extends ReduxAction {
    name?: string;
    payload: P;
}

export interface App {
    readonly store: Store<State>;
    readonly history: History;
    readonly sagaMiddleware: SagaMiddleware<any>;
    readonly actor: Actor;
    readonly modules: {[module: string]: boolean};
}
