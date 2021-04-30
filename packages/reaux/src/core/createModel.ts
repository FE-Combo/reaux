import {State, App, ModelProperty, ModelLifeCycle} from "../type";
import {setModuleAction} from "./shared";

/**
 * Proxy store
 */
export class Model<S> extends ModelProperty<S> implements ModelLifeCycle<any> {
    private app: App | null = null;
    public constructor(readonly moduleName: string, readonly initState: S) {
        super();
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
        return this.app!.store.getState()[this.moduleName];
    }

    get initialState(): Readonly<S> {
        return this.initState;
    }

    get rootState(): Readonly<State> {
        return this.app!.store.getState();
    }

    setState(newState: Partial<S>) {
        this.app!.store.dispatch(setModuleAction(this.moduleName, newState));
    }

    restState() {
        this.app!.store.dispatch(setModuleAction(this.moduleName, this.initState));
    }

    _injectApp(app: App, disabledInitState: boolean = false) {
        this.app = app;
        !disabledInitState && this.app!.store.dispatch(setModuleAction(this.moduleName, this.initState));
    }
}
