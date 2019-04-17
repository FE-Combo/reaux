import {SagaIterator} from "redux-saga";
import {setStateAction} from "../index";
import {LifeCycleListener, BaseStateView, BaseAppView} from "../type";

export function createModel<S extends object = {}>(app: BaseAppView, setHistory?: (newURL: string) => {type: any; payload: any}): new (name: string, state: S) => BaseModel<S> {
    return class Model extends BaseModel<S> {
        public constructor(public readonly moduleName: string, protected readonly initialState: S) {
            super(moduleName, initialState);
            // 存储初始化 State 到 redux
            // super(moduleName, initialState);
            app.store.dispatch(setStateAction(moduleName, initialState, `@@${moduleName}/initState`));
        }

        protected get state(): Readonly<S> {
            return app.store.getState().app[this.moduleName];
        }

        protected get rootState(): Readonly<BaseStateView> {
            return app.store.getState();
        }

        protected setState(newState: Partial<S>) {
            app.store.dispatch(setStateAction(this.moduleName, newState, `@@${this.moduleName}/setState[${Object.keys(newState).join(",")}]`));
        }

        protected setHistory(newURL: string) {
            if ("history" in app && setHistory) {
                app.store.dispatch(setHistory(newURL));
            }
        }
    };
}

export class BaseModel<S> implements LifeCycleListener {
    public constructor(public readonly moduleName: string, protected readonly initialState: S) {}

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
