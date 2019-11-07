import {SagaIterator} from "redux-saga";
import {put} from "redux-saga/effects";
import {setLoadingHelperAction, setLangHelperAction, ModelLifeCycle, LangActionPayload} from "reaux";
import {StateView} from "./type";

type ActionHandler = (...args: any[]) => SagaIterator;

type HandlerDecorator = (target: object, name: string | symbol, descriptor: TypedPropertyDescriptor<ActionHandler>) => TypedPropertyDescriptor<ActionHandler>;

type HandlerInterceptor<S> = (handler: ActionHandler, state: Readonly<S>) => SagaIterator;

type LifeCycleDecorator = (target: object, propertyKey: keyof ModelLifeCycle, descriptor: TypedPropertyDescriptor<ActionHandler & {isLifecycle?: boolean}>) => TypedPropertyDescriptor<ActionHandler>;

function handlerDecorator<S extends StateView>(interceptor: HandlerInterceptor<S>): HandlerDecorator {
    return (target, name, descriptor) => {
        const handler = descriptor.value!;
        descriptor.value = function*(...args: any[]): SagaIterator {
            const rootState: S = (target as any).rootState;
            yield* interceptor(handler.bind(this, ...args), rootState) as any;
        };
        return descriptor;
    };
}

function Loading(identifier: string = "global") {
    return handlerDecorator(function*(handler) {
        try {
            yield put(setLoadingHelperAction(identifier, true));
            yield* handler() as any;
        } finally {
            yield put(setLoadingHelperAction(identifier, false));
        }
    });
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

function setLang(lang: LangActionPayload) {
    setLangHelperAction(lang);
}

export const helper = {
    Loading,
    setLang,
    Lifecycle,
    handlerDecorator,
};
