import {ActionTypeView, StateActionPayloadView, LoadingActionView} from "../../doReact/src/type";
import {Exception, RuntimeException} from "../util/exception";

export const SET_STATE_ACTION: string = "@@framework/setState";
export const LOADING_ACTION: string = "@@framework/loading";
export const ERROR_ACTION_TYPE: string = "@@framework/error";

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
