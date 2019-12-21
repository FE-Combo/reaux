import {State, ModelType, App} from "../type";
import {setStateAction} from "./utils";
import {SagaIterator} from "redux-saga";

abstract class ModelProperty<S> {
    abstract readonly moduleName: string;
    abstract readonly initState: S;
    abstract state: Readonly<S>;
    abstract rootState: Readonly<State>;
    abstract setState(newState: Partial<State>): void;
    abstract restState(): void;
}

abstract class ModelLifeCycle<R = any> {
    abstract onReady(): R;
    abstract onLoad(): R;
    abstract onUnload(): R;
    abstract onHide(): R;
}

let appCache: App | null = null;

export function modelInjection(app: App) {
    appCache = app;
}

/**
 * Proxy store
 */
export class Model<S> extends ModelProperty<S> {
    public constructor(readonly moduleName: string, readonly initState: S) {
        super();
        if (!appCache) {
            throw new Error("Execute the injection function before using Model only!!");
        }
        appCache!.store.dispatch(setStateAction(moduleName, initState));
    }

    get state(): Readonly<S> {
        return appCache!.store.getState().app[this.moduleName];
    }

    get rootState(): Readonly<State> {
        return appCache!.store.getState();
    }

    setState(newState: Partial<S>) {
        appCache!.store.dispatch(setStateAction(this.moduleName, newState, `@@${this.moduleName}/setState[${Object.keys(newState).join(",")}]`));
    }

    restState() {
        appCache!.store.dispatch(setStateAction(this.moduleName, this.initState, `@@${this.moduleName}/resetState`));
    }

    // LifeCycle onReady/onLoad/onUnload/onHide
    onReady() {
        // extends to be overrode
    }

    onLoad() {
        // extends to be overrode
    }

    onUnload() {
        // extends to be overrode
    }

    onHide() {
        // extends to be overrode
    }
}

/**
 * Proxy Promise Model
 */
export class BaseOnPromiseModel<State> extends Model<State> implements ModelLifeCycle {
    type: ModelType = ModelType.P;
    async onReady() {
        // extends to be overrode
    }

    async onLoad() {
        // extends to be overrode
    }

    async onUnload() {
        // extends to be overrode
    }

    async onHide() {
        // extends to be overrode
    }
}

/**
 * Proxy Generator Model
 */
export class BaseOnGeneratorModel<State> extends Model<State> implements ModelLifeCycle<SagaIterator> {
    type: ModelType = ModelType.G;
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
}
