import {Action, Store, Reducer, ReducersMapObject} from "redux";

export interface ActionHandlers {
    [key: string]: (...args: any[]) => any;
}

export interface App {
    store: Store;
    actionHandlers: {[type: string]: ActionHandler};
    exceptionHandler: ExceptionHandler;
    // Add a dictionary to keep track of the registered async reducers
    asyncReducers: ReducersMapObject<State, any>;
    // adds the async reducer, and creates a new combined reducer
    injectReducer: (reducers: Reducer<State>) => any;
}

export interface State {
    [namespace: string]: ActionPayload;
}

export type ActionPayload = any;

export interface ErrorState {
    runtimeException: any;
    apiException: any;
}

export interface LoadingState {
    [loading: string]: number; // there may be multiple effects listen to it, hide loading component when status === 0
}

export interface ActionType<P = any> extends Action {
    name?: string;
    payload: P;
}

// return Generator or Promise
export type ActionHandler = (...args: any[]) => any;

export abstract class ModelProperty<S> {
    abstract readonly moduleName: string;
    abstract readonly initState: S;
    abstract state: Readonly<S>;
    abstract rootState: Readonly<State>;
    abstract setState(newState: Partial<S>): void;
    abstract resetState(): void;
}

export abstract class ModelLifeCycle<R = any> {
    abstract onReady(...args: any[]): R;
    abstract onLoad(...args: any[]): R;
    abstract onUpdate(...args: any[]): R;
    abstract onUnload(...args: any[]): R;
    abstract onShow(...args: any[]): R;
    abstract onHide(...args: any[]): R;
    abstract onTick: ((...args: any[]) => R) & {interval?: number};
}

export abstract class Exception {
    protected constructor(public message: string) {}
}

export interface ExceptionHandler {
    onError?: (error: Exception) => any;
}

type ActionCreator<H> = H extends (...args: infer P) => any ? (...args: P) => ActionType<P> : never;

export type ActionCreators<H> = {readonly [K in keyof H]: ActionCreator<H[K]>};

export type BaseModel<S = {}, R = any> = ModelProperty<S> & ModelLifeCycle<R>;
