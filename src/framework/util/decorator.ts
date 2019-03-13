import {SagaIterator} from "redux-saga";
import {put} from "redux-saga/effects";
import {setLoadingAction} from "../core/redux";
import {StateView, ActionHandler} from "../core/type";
import {LifeCycleListener} from "../core/mvc";

type HandlerDecorator = (target: object, name: string | symbol, descriptor: TypedPropertyDescriptor<ActionHandler>) => TypedPropertyDescriptor<ActionHandler>;
type HandlerInterceptor<S> = (handler: ActionHandler, state: Readonly<S>) => SagaIterator;
type LifeCycleDecorator = (target: object, propertyKey: keyof LifeCycleListener, descriptor: TypedPropertyDescriptor<ActionHandler & {isLifecycle?: boolean}>) => TypedPropertyDescriptor<ActionHandler>;

export function handlerDecorator<S extends StateView = StateView>(interceptor: HandlerInterceptor<S>): HandlerDecorator {
    return (target, name, descriptor) => {
        const handler = descriptor.value!;
        descriptor.value = function*(...args: any[]): SagaIterator {
            const rootState: S = (target as any).rootState;
            if (rootState) {
                yield* interceptor(handler.bind(this, ...args), rootState);
            } else {
                throw new Error("decorator must be applied to handler method");
            }
        };
        return descriptor;
    };
}

export function Loading(identifier: string) {
    return handlerDecorator(function*(handler) {
        try {
            yield put(setLoadingAction(identifier, true));
            yield* handler();
        } finally {
            yield put(setLoadingAction(identifier, false));
        }
    });
}

export function Lifecycle(): LifeCycleDecorator {
    return (target, propertyKey, descriptor) => {
        descriptor.value!.isLifecycle = true;
        return descriptor;
    };
}
