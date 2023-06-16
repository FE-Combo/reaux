import {ActionHandler, ModelLifeCycle, State} from "reaux";

type HandlerDecorator = (target: object, name: string | symbol, descriptor: TypedPropertyDescriptor<ActionHandler>) => TypedPropertyDescriptor<ActionHandler>;
type HandlerInterceptor<S> = (handler: ActionHandler, state: Readonly<S>) => any;

type LifeCycleDecorator = (target: object, propertyKey: keyof ModelLifeCycle, descriptor: TypedPropertyDescriptor<ActionHandler & {isLifecycle?: boolean; interval?: number}>) => TypedPropertyDescriptor<ActionHandler>;

function handlerDecorator<S extends State>(interceptor: HandlerInterceptor<S>): HandlerDecorator {
    return (target: any) => {
        const descriptor = target.descriptor;
        const fn: ActionHandler = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            const rootState: S = (target as any).rootState;
            (await interceptor(fn.bind(this, ...args), rootState)) as any;
        };
        return descriptor;
    };
}

function lifecycle(): LifeCycleDecorator {
    return (target, propertyKey, descriptor) => {
        descriptor.value!.isLifecycle = true;
        return descriptor;
    };
}

function interval(value = 1): LifeCycleDecorator {
    return (target, propertyKey, descriptor) => {
        descriptor.value!.interval = value * 1000;
        return descriptor;
    };
}

export const helper = {
    handlerDecorator,
    lifecycle,
    interval,
};
