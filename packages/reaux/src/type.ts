import {Action, Store, Reducer, ReducersMapObject} from "redux";

export interface App {
    modules: Record<string, number>;
    store: Store;
    actionPHandlers: Record<string, ActionHandler>;
    actionGHandlers: Record<string, ActionHandler>;
    actionHandlers: Record<string, ActionHandler>;
    exceptionHandler: ExceptionHandler;
    // Add a dictionary to keep track of the registered async reducers
    asyncReducers: ReducersMapObject<State, any>;
    // adds the async reducer, and creates a new combined reducer
    injectReducer: (reducers: Reducer<State>) => any;
}

export interface State {
    [namespace: string]: ActionPayload;
}

export type ActionPayload = {} | ErrorState | LoadingState;

export interface ErrorState {
    runtimeException: any;
    apiException: any;
}

export interface LoadingState {
    [loading: string]: number; // there may be multiple effects listen to it, hide loading component when status === 0
}

export interface ActionType<P = {}> extends Action {
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
    abstract restState(): void;
}

export abstract class ModelLifeCycle<R = any> {
    abstract onReady(): R;
    abstract onLoad(didMount: boolean): R;
    abstract onUnload(): R;
    abstract onHide(): R;
}

export abstract class Exception {
    protected constructor(public message: string) {}
}

export interface ExceptionHandler {
    onError?: (error: Exception) => any;
}

type ActionCreator<H> = H extends (...args: infer P) => any ? (...args: P) => ActionType<P> : never;
type HandlerKeys<H> = {[K in keyof H]: H[K] extends (...args: any[]) => any ? K : never}[Exclude<keyof H, keyof ModelLifeCycle | keyof ExceptionHandler>];
export type ActionCreators<H> = {readonly [K in HandlerKeys<H>]: ActionCreator<H[K]>};

export interface DomCache {
    isServer?: boolean;
    initialAllRedux?: object;
    serverRenderedModules?: string[];
}

export interface ModuleReturn<H> {
    actions: ActionCreators<H>;
    component: React.ComponentType | null;
}
