import {State, App, ModelProperty, ModelLifeCycle} from "../type";
import {AnyAction} from "redux";
import {setModuleAction} from "./shared";

/**
 * Proxy store
 */

export function createModel(appCache: App | (() => App)) {
    const cache = typeof appCache === "function" ? appCache() : appCache;
    return class Model<S extends {}, R extends State = State> extends ModelProperty<S> implements ModelLifeCycle<any> {
        public constructor(readonly moduleName: string, readonly initState: S) {
            super();
        }

        // LifeCycle onReady/onLoad/onUnload/onHide
        onReady() {
            // extends to be overrode
        }

        onLoad() {
            // extends to be overrode
        }

        onUpdate() {
            // extends to be overrode
        }

        onUnload() {
            // extends to be overrode
        }

        onShow() {
            // extends to be overrode
        }

        onHide() {
            // extends to be overrode
        }

        get state(): Readonly<S> {
            return cache.store.getState()[this.moduleName];
        }

        get initialState(): Readonly<S> {
            return this.initState;
        }

        get rootState(): Readonly<R> {
            return cache.store.getState();
        }

        setState(newState: Partial<S>) {
            cache.store.dispatch(setModuleAction(this.moduleName, newState));
        }

        resetState() {
            cache.store.dispatch(setModuleAction(this.moduleName, this.initState));
        }

        dispatch(action: AnyAction) {
            cache.store.dispatch(action);
        }
    };
}
