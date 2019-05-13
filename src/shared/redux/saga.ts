// TODO: saga call / saga folk / saga spawn
import {SagaIterator} from "redux-saga";
import {call, put, takeEvery} from "redux-saga/effects";
import {setErrorAction, ERROR_ACTION_TYPE} from "./action";
import {ActionTypeView, ActionHandler, ErrorHandler} from "../type";

export function* saga(actionHandler: {[type: string]: ActionHandler}, errorHandler: ErrorHandler | null): SagaIterator {
    // Register saga, listener all actions
    yield takeEvery("*", function*(action: ActionTypeView<any>): SagaIterator {
        // Trigger by dispatch or yield put
        if (action.type === ERROR_ACTION_TYPE) {
            if (errorHandler) {
                yield* errorHandler(action.payload);
            } else {
                console.error("Errors occurred, no bugs were monitored");
            }
        } else {
            const handler = actionHandler[action.type];
            if (handler) {
                yield call(run, handler, action.payload);
            }
        }
    });
}

/* 执行 actionHandler (执行函数) */
function* run(handler: ActionHandler, payload: any[]): SagaIterator {
    // handler: 函数体， payload: 函数参数
    try {
        yield* handler(...payload);
    } catch (error) {
        console.error("Redux Saga Error");
        console.error(error);
        yield put(setErrorAction(error));
    }
}
