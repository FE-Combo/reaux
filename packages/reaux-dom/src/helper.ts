import {SagaIterator} from "redux-saga";
import {put} from "redux-saga/effects";
import {setHelperLoadingAction, setHelperLanguageAction, ModelLifeCycle} from "reaux";
import {StateView} from "./type";

type ActionHandler = (...args: any[]) => SagaIterator;

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

/**
 * 需要在事件的最顶部使用
 */
function Lifecycle(): LifeCycleDecorator {
    return (target, propertyKey, descriptor) => {
        descriptor.value!.isLifecycle = true;
        return descriptor;
    };
}

export const helper = {
    loading(identifier: string = "global") {
        return handlerDecorator(function*(handler) {
            try {
                yield put(setHelperLoadingAction(identifier, true));
                yield* handler() as any;
            } finally {
                yield put(setHelperLoadingAction(identifier, false));
            }
        });
    },
    setLang(lang: string) {
        setHelperLanguageAction(lang);
    },
    Lifecycle,
    handlerDecorator,
};
