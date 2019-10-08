/**
 * 1. generate Model
 * 2. proxy store and life cycle
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

type DispatchState<State = {}> = (module: string, state: Partial<State>, type: string) => any;

const cache: {allState: StateView | null; dispatchState: DispatchState | null} = {
    allState: null,
    dispatchState: null,
};

export function injection(allState: StateView, dispatchState: DispatchState) {
    cache.allState = allState;
    cache.dispatchState = dispatchState;
}

class StoreModel<State> extends ModelProperty<State> {
    public constructor(readonly moduleName: string, readonly initState: State) {
        super();
        if (!cache.allState || !cache.dispatchState) {
            console.error("Execute the injection function before using StoreModel only!!");
            return;
        }
        cache.dispatchState(moduleName, initState, `@@${moduleName}/initState`);
    }

    get state(): Readonly<State> {
        return cache.allState!.app[this.moduleName];
    }

    get rootState(): Readonly<StateView> {
        return cache.allState!;
    }

    setState(newState: Partial<State>) {
        cache.dispatchState!(this.moduleName, newState, `@@${this.moduleName}/setState[${Object.keys(newState).join(",")}]`);
    }
}

export class BaseOnPromiseModel<State> extends StoreModel<State> implements ModelLifeCycle {
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

export class BaseOnGeneratorModel<State> extends StoreModel<State> implements ModelLifeCycle {
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
}
