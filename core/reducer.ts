import {Reducer} from "redux";
import {initialState, State} from "./state";
import {Action} from "./type";
import {Exception, RuntimeException} from "./Exception";

export {LOCATION_CHANGE} from "connected-react-router";
const SET_STATE_ACTION: string = "@@framework/setState";
export const ERROR_ACTION_TYPE: string = "@@framework/error";

interface SetStateActionPayload {
    module: string;
    state: any;
}

export function setStateAction(module: string, state: object, type: string): Action<SetStateActionPayload> {
    return {
        type,
        name: SET_STATE_ACTION,
        payload: {module, state},
    };
}

export function errorAction(error: any): Action<Exception> {
    const exception: Exception = error instanceof Exception ? error : new RuntimeException(error && error.message ? error.message : "unknown error");
    return {
        type: ERROR_ACTION_TYPE,
        payload: exception,
    };
}

export function rootReducer(): Reducer<State> {
    return (state: State = initialState, action): State => {
        // Dispatch & yield put triggers every time.
        if (action.name === SET_STATE_ACTION) {
            const nextState: State = {...state};
            nextState.app = {...nextState.app, [action.payload.module]: action.payload.state};
            return nextState;
        } else {
            return state;
        }
    };
}
