import {SagaIterator} from "redux-saga";
import {put} from "redux-saga/effects";
import {ModelLifeCycle, App, setModuleAction} from "reaux";
import {StateView, DOMApp} from "./type";

type ActionHandler = (...args: any[]) => any;

type HandlerDecorator = (target: object, name: string | symbol, descriptor: TypedPropertyDescriptor<ActionHandler>) => TypedPropertyDescriptor<ActionHandler>;

type HandlerInterceptor<S> = (handler: ActionHandler, state: Readonly<S>) => SagaIterator;

type LifeCycleDecorator = (target: object, propertyKey: keyof ModelLifeCycle, descriptor: TypedPropertyDescriptor<ActionHandler & {isLifecycle?: boolean}>) => TypedPropertyDescriptor<ActionHandler>;

// TODO:move to reaux
function handlerDecorator<S extends StateView>(interceptor: HandlerInterceptor<S>): HandlerDecorator {
    return (target, name, descriptor) => {
        const handler = descriptor.value!;
        // TODO: Detect whether it is promise or generator
        descriptor.value = function*(...args: any[]): SagaIterator {
            const rootState: S = (target as any).rootState;
            yield* interceptor(handler.bind(this, ...args), rootState) as any;
        };
        return descriptor;
    };
}

export function genHelper() {
    let helper: Helper;
    return {
        injectApp: (app: DOMApp) => (helper = new Helper(app)),
        useHelper: () => helper,
    };
}

export class Helper {
    appCache: App;
    constructor(app: App) {
        this.appCache = app;
    }
    loading(identifier: string = "global") {
        const that = this;
        return handlerDecorator(function*(handler) {
            try {
                const nextLoadingState = that.appCache.store.getState()["@loading"];
                nextLoadingState[identifier] = nextLoadingState[identifier] + 1 || 1;
                yield put(setModuleAction("@loading", nextLoadingState));
                yield* handler() as any;
            } finally {
                const nextLoadingState = that.appCache.store.getState()["@loading"];
                nextLoadingState[identifier] = nextLoadingState[identifier] - 1 || 0;
                yield put(setModuleAction("@loading", nextLoadingState));
            }
        });
    }
    lifecycle(): LifeCycleDecorator {
        return (target, propertyKey, descriptor) => {
            descriptor.value!.isLifecycle = true;
            return descriptor;
        };
    }
}
