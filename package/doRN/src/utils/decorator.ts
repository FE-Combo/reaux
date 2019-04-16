import {SagaIterator} from "redux-saga";
import {ActionHandler, LifeCycleListener, BaseStateView} from "../../../shared/type";

type HandlerDecorator = (target: object, name: string | symbol, descriptor: TypedPropertyDescriptor<ActionHandler>) => TypedPropertyDescriptor<ActionHandler>;
type HandlerInterceptor<S> = (handler: ActionHandler, state: Readonly<S>) => SagaIterator;

type LifeCycleDecorator = (target: object, propertyKey: keyof LifeCycleListener, descriptor: TypedPropertyDescriptor<ActionHandler & {isLifecycle?: boolean}>) => TypedPropertyDescriptor<ActionHandler>;

export function handlerDecorator<S extends BaseStateView<any>>(interceptor: HandlerInterceptor<S>): HandlerDecorator {
    return (target: any) => {
        const descriptor = target.descriptor;
        const fn: ActionHandler = descriptor.value;
        descriptor.value = function*(...args: any[]): SagaIterator {
            const rootState: S = (target as any).rootState;
            yield* interceptor(fn.bind(this, ...args), rootState);
        };
        return descriptor;
    };
}

export function Lifecycle(): LifeCycleDecorator {
    return (target: any) => {
        const descriptor = target.descriptor;
        descriptor.value.isLifecycle = true;
        return target;
    };
}
