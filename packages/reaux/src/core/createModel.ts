import {State, App, ModelProperty, ModelLifeCycle} from "../type";
import {AnyAction} from "redux";
import {setModuleAction, resetModuleAction, filterObject} from "./shared";

/**
 * Proxy store
 */

export function createModel(appCache: App | (() => App)) {
    const cache = typeof appCache === "function" ? appCache() : appCache;
    return class Model<S extends {}, R extends State = State> extends ModelProperty<S> implements ModelLifeCycle<any> {
        public constructor(readonly moduleName: string, readonly initialState: S) {
            super();
        }

        // LifeCycle
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onReady(...args: any[]) {
            // extends to be overrode
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onLoad(...args: any[]) {
            // extends to be overrode
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onUpdate(...args: any[]) {
            // extends to be overrode
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onUnload(...args: any[]) {
            // extends to be overrode
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onShow(...args: any[]) {
            // extends to be overrode
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onHide(...args: any[]) {
            // extends to be overrode
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onTick(...args: any[]) {
            // extends to be overrode
        }

        get state(): Readonly<S> {
            return cache.store.getState()[this.moduleName];
        }

        get rootState(): Readonly<R> {
            return cache.store.getState();
        }

        setState(newState: Partial<S>) {
            cache.store.dispatch(setModuleAction(this.moduleName, newState));
        }

        resetState(key?: (keyof S)[] | keyof S) {
            if (key) {
                const nextState = filterObject(this.initialState, key);
                cache.store.dispatch(setModuleAction(this.moduleName, nextState));
            } else {
                cache.store.dispatch(resetModuleAction(this.moduleName, this.initialState));
            }
        }

        dispatch(action: AnyAction) {
            cache.store.dispatch(action);
        }
    };
}
