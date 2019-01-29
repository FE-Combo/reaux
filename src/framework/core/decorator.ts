import {SagaIterator} from "redux-saga";
import {put} from "redux-saga/effects";
import {loadingAction} from "./reducer";
import {ActionHandler} from "./handler";
import {StateView} from "./type";

type HandlerDecorator = (target: object, name: string | symbol, descriptor: TypedPropertyDescriptor<ActionHandler>) => TypedPropertyDescriptor<ActionHandler>;
type HandlerInterceptor<S> = (handler: ActionHandler, state: Readonly<S>) => SagaIterator;

function handlerDecorator<S extends StateView = StateView>(interceptor: HandlerInterceptor<S>): HandlerDecorator {
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

export function loading(identifier: string) {
    return handlerDecorator(function*(handler) {
        try {
            yield put(loadingAction(identifier, true));
            yield* handler();
        } finally {
            yield put(loadingAction(identifier, false));
        }
    });
}
