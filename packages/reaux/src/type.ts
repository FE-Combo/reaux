import {Action, Store, Reducer, ReducersMapObject} from "redux";

export interface ActionHandlers {
    [key: string]: (...args: any[]) => any;
}

export interface App {
    modules: {};
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

export type ActionPayload = {} | ErrorState | LoadingState | any;

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
    abstract onReady(): R;
    abstract onLoad(): R;
    abstract onUpdate(): R;
    abstract onUnload(): R;
    abstract onShow(): R;
    abstract onHide(): R;
}

export abstract class Exception {
    protected constructor(public message: string) {}
}

export interface ExceptionHandler {
    onError?: (error: Exception) => any;
}

type ActionCreator<H> = H extends (...args: infer P) => any ? (...args: P) => ActionType<P> : never;

export type ActionCreators<H> = {readonly [K in keyof H]: ActionCreator<H[K]>};
