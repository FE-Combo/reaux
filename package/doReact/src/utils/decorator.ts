import {SagaIterator} from "redux-saga";
import {put} from "redux-saga/effects";
import {setLoadingAction} from "../../../shared";
import {LifeCycleListener, ActionHandler, BaseStateView} from "../../../shared/type";

type HandlerDecorator = (target: object, name: string | symbol, descriptor: TypedPropertyDescriptor<ActionHandler>) => TypedPropertyDescriptor<ActionHandler>;
type HandlerInterceptor<S> = (handler: ActionHandler, state: Readonly<S>) => SagaIterator;
type LifeCycleDecorator = (target: object, propertyKey: keyof LifeCycleListener, descriptor: TypedPropertyDescriptor<ActionHandler & {isLifecycle?: boolean}>) => TypedPropertyDescriptor<ActionHandler>;

export function handlerDecorator<S extends BaseStateView<any>>(interceptor: HandlerInterceptor<S>): HandlerDecorator {
    return (target, name, descriptor) => {
        const handler = descriptor.value!;
        descriptor.value = function*(...args: any[]): SagaIterator {
            const rootState: S = (target as any).rootState;
            yield* interceptor(handler.bind(this, ...args), rootState);
        };
        return descriptor;
    };
}

export function Loading(identifier: string = "global") {
    return handlerDecorator(function*(handler) {
        try {
            yield put(setLoadingAction(identifier, true));
            yield* handler();
        } finally {
            yield put(setLoadingAction(identifier, false));
        }
    });
}

/**
 * 需要在事件的最顶部使用
 */
export function Lifecycle(): LifeCycleDecorator {
    return (target, propertyKey, descriptor) => {
        descriptor.value!.isLifecycle = true;
        return descriptor;
    };
}
