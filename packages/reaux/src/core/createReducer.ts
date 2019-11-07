import {Reducer, combineReducers, ReducersMapObject} from "redux";
import {StateView, ActionType, AppActionPayload, LoadingActionPayload, LangActionPayload} from "../type";

export const SET_STATE_ACTION: string = "@@framework/setState";
export const SET_HELPER_ACTION: string = "@framework/setHelper";
export const LOADING_ACTION_NAME: string = "@@framework/setHelper/loading";
export const LANG_ACTION_NAME: string = "@@framework/setHelper/lang";

export function setStateAction<State>(module: string, state: Partial<State>, name: string): ActionType<AppActionPayload> {
    return {
        type: SET_STATE_ACTION,
        name,
        payload: {module, state},
    };
}

export function setLoadingHelperAction(identifier: string, hasShow: boolean): ActionType<LoadingActionPayload> {
    return {
        type: SET_HELPER_ACTION,
        name: LOADING_ACTION_NAME,
        payload: {identifier, hasShow},
    };
}

export function setLangHelperAction(lang: LangActionPayload) {
    return {
        type: SET_HELPER_ACTION,
        name: LANG_ACTION_NAME,
        payload: lang,
    };
}

function appReducer(state: StateView["app"] = {}, action: ActionType<AppActionPayload>): StateView["app"] {
    if (action.type === SET_STATE_ACTION) {
        const {module, state: moduleState} = action.payload as AppActionPayload;
        return {...state, [module]: {...state[module], ...moduleState}};
    }
    return state;
}

function helperReducer(state: StateView["helper"] = {}, action: ActionType<LoadingActionPayload | LangActionPayload>): StateView["helper"] {
    if (action.type === SET_HELPER_ACTION) {
        if (action.name === LOADING_ACTION_NAME) {
            const {hasShow, identifier} = action.payload as LoadingActionPayload;
            const nextState = {...state};
            !nextState.loading && (nextState.loading = {});
            const count = nextState.loading[identifier] || 0;
            nextState.loading.identifier = count + (hasShow ? 1 : -1);
            return nextState;
        }
        if (action.name === LANG_ACTION_NAME) {
            const lang = action.payload as LangActionPayload;
            const nextState = {...state};
            nextState.lang = lang;
            return nextState;
        }
    }
    return state;
}

export function createReducer<T extends StateView>(callback?: (result: ReducersMapObject<StateView, any>) => ReducersMapObject<any, any>): Reducer<T> {
    const reducers: ReducersMapObject<StateView, any> = {app: appReducer, helper: helperReducer};
    const resultReducers = callback ? callback(reducers) : reducers;
    return combineReducers(resultReducers);
}
