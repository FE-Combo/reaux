import {State, App, ModelProperty, ModelLifeCycle} from "../type";
import {setModuleAction} from "./shared";

let appCache: App | null = null;

export function modelInjection(app: App) {
    appCache = app;
}

/**
 * Proxy store
 */
export class Model<S> extends ModelProperty<S> implements ModelLifeCycle<any> {
    public constructor(readonly moduleName: string, readonly initState: S) {
        super();
        if (!appCache) {
            throw new Error("Execute the injection function before using Model only!!");
        }
        appCache!.store.dispatch(setModuleAction(moduleName, initState));
    }

    // LifeCycle onReady/onLoad/onUnload/onHide
    onReady() {
        // extends to be overrode
    }

    onLoad(didMount: boolean) {
        // extends to be overrode
    }

    onUnload() {
        // extends to be overrode
    }

    onHide() {
        // extends to be overrode
    }

    get state(): Readonly<S> {
        return appCache!.store.getState()[this.moduleName];
    }

    get initialState(): Readonly<S> {
        return this.initState;
    }

    get rootState(): Readonly<State> {
        return appCache!.store.getState();
    }

    setState(newState: Partial<S>) {
        appCache!.store.dispatch(setModuleAction(this.moduleName, newState));
    }

    restState() {
        appCache!.store.dispatch(setModuleAction(this.moduleName, this.initState));
    }
}
