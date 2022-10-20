import {ActionHandler, ModelLifeCycle, State} from "reaux";

type HandlerDecorator = (target: object, name: string | symbol, descriptor: TypedPropertyDescriptor<ActionHandler>) => TypedPropertyDescriptor<ActionHandler>;
type HandlerInterceptor<S> = (handler: ActionHandler, state: Readonly<S>) => any;

type LifeCycleDecorator = (target: object, propertyKey: keyof ModelLifeCycle, descriptor: TypedPropertyDescriptor<ActionHandler & {isLifecycle?: boolean}>) => TypedPropertyDescriptor<ActionHandler>;

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

function Lifecycle(): LifeCycleDecorator {
    return (target: any) => {
        const descriptor = target.descriptor;
        descriptor.value.isLifecycle = true;
        return target;
    };
}

export const helper = {
    handlerDecorator,
    Lifecycle,
};
