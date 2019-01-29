import {Reducer, combineReducers} from "redux";
import {ActionView, AppView, LoadingStateView, StateView} from "./type";
import {Exception, RuntimeException} from "./Exception";
import {LocationChangeAction, RouterState} from "connected-react-router";

export {LOCATION_CHANGE} from "connected-react-router";
const SET_STATE_ACTION: string = "@@framework/setState";
export const LOADING_ACTION = "@@framework/loading";
export const ERROR_ACTION_TYPE: string = "@@framework/error";

interface SetStateActionPayload {
    module: string;
    state: any;
}

interface LoadingActionPayload {
    identifier: string;
    hasShow: boolean;
}

export function setStateAction(module: string, state: object, type: string): ActionView<SetStateActionPayload> {
    return {
        type,
        name: SET_STATE_ACTION,
        payload: {module, state},
    };
}

export function loadingAction(identifier: string, hasShow: boolean): ActionView<LoadingActionPayload> {
    return {
        type: LOADING_ACTION,
        payload: {identifier, hasShow},
    };
}

export function errorAction(error: any): ActionView<Exception> {
    const exception: Exception = error instanceof Exception ? error : new RuntimeException(error && error.message ? error.message : "unknown error");
    return {
        type: ERROR_ACTION_TYPE,
        payload: exception,
    };
}

export function appReducer(state: StateView["app"] = {}, action: ActionView<any>): StateView["app"] {
    if (action.name === SET_STATE_ACTION) {
        const {module, state: moduleState} = action.payload as SetStateActionPayload;
        return {...state, [module]: {...state[module], ...moduleState}};
    }
    return state;
}

function loadingReducer(state: LoadingStateView = {}, action: ActionView<any>): LoadingStateView {
    if (action.type === LOADING_ACTION) {
        const payload = action.payload as LoadingActionPayload;
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
