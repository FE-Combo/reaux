import {SagaIterator} from "redux-saga";
import {put} from "redux-saga/effects";
import {setStateAction} from "../index";
import {LifeCycleListener, BaseStateView, BaseAppView} from "../type";

export function createModel<S extends object = {}>(app: BaseAppView, setHistory: (newURL: string) => {type: any; payload: any}) {
    return class Model extends BaseModel<S> {
        public constructor(public readonly module: string, readonly initialState: S) {
            // 存储初始化 State 到 redux
            super(module, initialState);
            app.store.dispatch(setStateAction(module, initialState, `@@${module}/initState`));
        }

        protected get state(): Readonly<S> {
            return app.store.getState().app[this.module];
        }

        protected get rootState(): Readonly<BaseStateView> {
            return app.store.getState();
        }

        protected *setState(newState: Partial<S>): SagaIterator {
            yield put(setStateAction(this.module, newState, `@@${this.module}/setState[${Object.keys(newState).join(",")}]`));
        }

        protected *setHistory(newURL: string): SagaIterator {
            if ("history" in app) {
                yield put(setHistory(newURL));
            }
        }
    };
}

export class BaseModel<S> implements LifeCycleListener {
    public constructor(public readonly module: string, readonly initialState: S) {}

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
