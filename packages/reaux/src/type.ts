import {Action} from "redux";

export interface ActionType<P = any> extends Action {
    name?: string;
    payload: P;
}

export interface AppActionPayload {
    module: string;
    state: any;
}

export interface LoadingActionPayload {
    identifier: string;
    hasShow: boolean;
}

export type LangActionPayload = "CN" | "EN";

// return Generator or Promise
export type ActionHandler = (...args: any[]) => any;

export interface ExceptionHandler {
    onError?: ErrorHandler;
}

// return Generator or Promise
export type ErrorHandler = (error: Exception) => any;

export interface AppView {
    actionPHandlers: {[type: string]: ActionHandler};
    actionGHandlers: {[type: string]: ActionHandler};
    actionHandler: {[type: string]: ActionHandler};
    modules: {};
    exceptionHandler: ExceptionHandler;
}

export abstract class Exception {
    protected constructor(public message: string) {}
}

export class RuntimeException extends Exception {
    constructor(message: string, public error: Error | null = null) {
        super(message);
    }
}

export interface StateView {
    app: {};
    helper: {
        loading?: LoadingState;
        lang?: LangActionPayload;
    };
}

export interface LoadingState {
    [loading: string]: number; // there may be multiple effects listen to it, hide loading component when status === 0
}

abstract class ModelProperty<State = {}> {
    abstract readonly moduleName: string;
    abstract readonly initState: State;
    abstract state: Readonly<State>;
    abstract rootState: Readonly<StateView>;
    abstract setState(newState: Partial<State>): void;
}

export abstract class ModelLifeCycle<R = any> {
    abstract onReady(): R;
    abstract onLoad(): R;
    abstract onUnload(): R;
    abstract onHide(): R;
}

export enum ModelType {
    P = "promise",
    G = "generator",
}

export type BaseModel<S = {}, R = any> = ModelProperty<S> & ModelLifeCycle<R>;
