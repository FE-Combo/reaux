import {Reducer, combineReducers} from "redux";
import {ActionTypeView, LoadingStateView, StateView, StateActionPayloadView, LoadingActionView, ActionHandler} from "./type";
import {Exception, RuntimeException} from "./exception";
import {LocationChangeAction, RouterState} from "connected-react-router";
import {SagaIterator} from "redux-saga";
import {call, put, takeEvery} from "redux-saga/effects";
import app from "./app";

/** action (loading setState error)  */
export const LOADING_ACTION: string = "@@framework/loading";
export const ERROR_ACTION_TYPE: string = "@@framework/error";
const SET_STATE_ACTION: string = "@@framework/setState";
export function setStateAction(module: string, state: object, type: string): ActionTypeView<StateActionPayloadView> {
    return {
        type,
        name: SET_STATE_ACTION,
        payload: {module, state},
    };
}
export function setLoadingAction(identifier: string, hasShow: boolean): ActionTypeView<LoadingActionView> {
    return {
        type: LOADING_ACTION,
        payload: {identifier, hasShow},
    };
}
export function setErrorAction(error: any): ActionTypeView<Exception> {
    const exception: Exception = error instanceof Exception ? error : new RuntimeException(error && error.message ? error.message : "unknown error");
    return {
        type: ERROR_ACTION_TYPE,
        payload: exception,
    };
}

/** reducer 处理逻辑 */
export function appReducer(state: StateView["app"] = {}, action: ActionTypeView<any>): StateView["app"] {
    if (action.name === SET_STATE_ACTION) {
        const {module, state: moduleState} = action.payload as StateActionPayloadView;
        return {...state, [module]: {...state[module], ...moduleState}};
    }
    return state;
}
function loadingReducer(state: LoadingStateView = {}, action: ActionTypeView<any>): LoadingStateView {
    if (action.type === LOADING_ACTION) {
        const payload = action.payload as LoadingActionView;
        const count = state[payload.identifier] || 0;
        return {
            ...state,
            [payload.identifier]: count + (payload.hasShow ? 1 : -1),
        };
    }
    return state;
}
export function rootReducer(routerReducer: Reducer<RouterState, LocationChangeAction>): Reducer<StateView> {
    return combineReducers<StateView>({
        router: routerReducer,
        app: appReducer,
        loading: loadingReducer,
    });
}

/* 执行 actionHandler (执行函数) */
export function* run(handler: ActionHandler, payload: any[]): SagaIterator {
    // handler: 函数体， payload: 函数参数
    try {
        yield* handler(...payload);
    } catch (error) {
        console.error("Redux Saga Error");
        console.error(error);
        yield put(setErrorAction(error));
    }
}

/* 所有 action 入口 */
export function* saga(): SagaIterator {
    // trigger one time, in order to mount all actions.
    yield takeEvery("*", function*(action: ActionTypeView<any>): SagaIterator {
        // Mounted on the program, Dispatch & yield put triggers every time.
        const handler = app.actionHandler[action.type];
        if (handler) {
            yield call(run, handler, action.payload);
        }
    });
}
