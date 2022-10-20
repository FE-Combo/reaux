import {State, App, ModelProperty, ModelLifeCycle} from "../type";
import {AnyAction} from "redux";
import {setModuleAction} from "./shared";

/**
 * Proxy store
 */

export function createModel(appCache: App) {
    return class Model<S extends {}> extends ModelProperty<S> implements ModelLifeCycle<any> {
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
            return appCache.store.getState()[this.moduleName];
        }

        get initialState(): Readonly<S> {
            return this.initState;
        }

        get rootState(): Readonly<State> {
            return appCache.store.getState();
        }

        setState(newState: Partial<S>) {
            appCache.store.dispatch(setModuleAction(this.moduleName, newState));
        }

        restState() {
            appCache.store.dispatch(setModuleAction(this.moduleName, this.initState));
        }

        dispatch(action: AnyAction) {
            appCache.store.dispatch(action);
        }
    };
}
