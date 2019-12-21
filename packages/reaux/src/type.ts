import {Action, Store} from "redux";

export interface App {
    store: Store;
    actionPHandlers: {[type: string]: ActionHandler};
    actionGHandlers: {[type: string]: ActionHandler};
    actionHandlers: {[type: string]: ActionHandler};
    modules: {};
    exceptionHandler: ExceptionHandler;
}

export interface State {
    app: {};
    helper: {
        loading?: LoadingState;
        lang?: string;
        exception?: Exception;
    };
}

export interface ActionType<P = any> extends Action {
    name?: string; // marking, no effect
    payload: P;
}

export interface ActionPayload<S = any> {
    module: string;
    state: S;
}

export interface HelperLoadingPayload {
    identifier: string;
    hasShow: boolean;
}

export type HelperPayload = string | HelperLoadingPayload | Exception;

export interface LoadingState {
    [loading: string]: number; // there may be multiple effects listen to it, hide loading component when status === 0
}

// return Generator or Promise
export type ActionHandler = (...args: any[]) => any;

export interface ExceptionHandler {
    onError?: ErrorHandler;
}

// return Generator or Promise
export type ErrorHandler = (error: Exception) => any;

export abstract class Exception {
    protected constructor(public message: string) {}
}

export class RuntimeException extends Exception {
    constructor(message: string, public error: Error | null = null) {
        super(message);
    }
}

abstract class ModelProperty<State = {}> {
    abstract readonly moduleName: string;
    abstract readonly initState: State;
    abstract state: Readonly<State>;
    abstract rootState: Readonly<State>;
    abstract setState(newState: Partial<State>): void;
}

export abstract class ModelLifeCycle<R = any> {
    abstract onReady(): R;
    abstract onLoad(didMount: boolean): R;
    abstract onUnload(): R;
    abstract onHide(): R;
}

export enum ModelType {
    P = "promise",
    G = "generator",
}

export type BaseModel<S = {}, R = any> = ModelProperty<S> & ModelLifeCycle<R>;
