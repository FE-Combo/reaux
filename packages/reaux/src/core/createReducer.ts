import {Reducer, combineReducers, ReducersMapObject} from "redux";
import {State, ActionType, ActionPayload, HelperLoadingPayload, HelperPayload, Exception} from "../type";
import {SET_STATE_ACTION, SET_HELPER_LOADING_ACTION, SET_HELPER_LANGUAGE_ACTION, SET_HELPER_EXCEPTION_ACTION} from "./utils";

function appReducer(state: State["app"] = {}, action: ActionType<ActionPayload>): State["app"] {
    if (action.type === SET_STATE_ACTION) {
        const {module, state: moduleState} = action.payload as ActionPayload;
        return {...state, [module]: {...state[module], ...moduleState}};
    }
    return state;
}

function helperReducer(state: State["helper"] = {}, action: ActionType<HelperPayload>): State["helper"] {
    const nextState = {...state};
    switch (action.type) {
        case SET_HELPER_LOADING_ACTION:
            const {hasShow, identifier} = action.payload as HelperLoadingPayload;
            !nextState.loading && (nextState.loading = {});
            const count = nextState.loading[identifier] || 0;
            nextState.loading.identifier = count + (hasShow ? 1 : -1);
            return nextState;
        case SET_HELPER_LANGUAGE_ACTION:
            nextState.lang = action.payload as string;
        case SET_HELPER_EXCEPTION_ACTION:
            nextState.exception = action.payload as Exception;
        default:
            return state;
    }
}

export function createReducer<T extends State>(callback?: (result: ReducersMapObject<State, any>) => ReducersMapObject<any, any>): Reducer<T> {
    const reducers: ReducersMapObject<State, any> = {app: appReducer, helper: helperReducer};
    const resultReducers = callback ? callback(reducers) : reducers;
    return combineReducers(resultReducers);
}
