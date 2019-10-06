/*
  proxy store
*/

import {StateView} from "../type";

abstract class ModelProperty<State = {}> {
    abstract readonly moduleName: string;
    abstract readonly initState: State;
    abstract state: Readonly<State>;
    abstract rootState: Readonly<StateView>;
    abstract setState(newState: Partial<State>): void;
}

abstract class ModelLifeCycle<R = any> {
    abstract onReady(): R;
    abstract onLoad(): R;
    abstract onUnload(): R;
    abstract onHide(): R;
}

type DispatchState<State> = (module: string, state: Partial<State>, type: string) => any;

export default function createModel<State>(allState: StateView, dispatchState: DispatchState<State>) {
    return class Model extends ModelProperty<State> {
        public constructor(readonly moduleName: string, readonly initState: State) {
            super();
            dispatchState(moduleName, initState, `@@${moduleName}/initState`);
        }

        get state(): Readonly<State> {
            return allState.app[this.moduleName];
        }

        get rootState(): Readonly<StateView> {
            return allState;
        }

        setState(newState: Partial<State>) {
            dispatchState(this.moduleName, newState, `@@${this.moduleName}/setState[${Object.keys(newState).join(",")}]`);
        }
    };
}

export function createBaseModelPromise<State>(allState: StateView, dispatchState: DispatchState<State>) {
    const BaseModel = createModel(allState, dispatchState);
    return class Model extends BaseModel implements ModelLifeCycle {
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
    };
}

export function createBaseModelGenerator<State>(allState: StateView, dispatchState: DispatchState<State>) {
    const BaseModel = createModel(allState, dispatchState);
    return class Model extends BaseModel implements ModelLifeCycle {
        *onReady(): any {
            // extends to be overrode
        }

        *onLoad(): any {
            // extends to be overrode
        }

        *onUnload(): any {
            // extends to be overrode
        }

        *onHide(): any {
            // extends to be overrode
        }
    };
}
