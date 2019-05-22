// TODO: saga call / saga folk / saga spawn
import {SagaIterator} from "redux-saga";
import {call, put, takeEvery} from "redux-saga/effects";
import {setErrorAction, ERROR_ACTION_TYPE} from "./action";
import {ActionTypeView, ActionHandler, ExceptionHandler} from "../type";

export function* saga(actionHandler: {[type: string]: ActionHandler}, exceptionHandler: ExceptionHandler): SagaIterator {
    // Register saga, listener all actions
    yield takeEvery("*", function*(action: ActionTypeView<any>): SagaIterator {
        // Trigger by dispatch or yield put
        if (action.type === ERROR_ACTION_TYPE) {
            // 全局 Error 或 actionHandler Error 处理逻辑
            if (exceptionHandler.onError) {
                yield* exceptionHandler.onError(action.payload);
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
        // 监听 actionHandler 发起的 error
        console.error("Redux Saga Error");
        console.error(error);
        yield put(setErrorAction(error)); // 调用 takeEvery action.type === ERROR_ACTION_TYPE
    }
}
