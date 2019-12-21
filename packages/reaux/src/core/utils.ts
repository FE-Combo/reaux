import {ActionType, ActionPayload, HelperLoadingPayload, Exception} from "../type";

export const SET_STATE_ACTION: string = "@@framework/setState";
export const SET_HELPER_LOADING_ACTION: string = "@@framework/setHelper/loading";
export const SET_HELPER_LANGUAGE_ACTION: string = "@@framework/setHelper/language";
export const SET_HELPER_EXCEPTION_ACTION: string = "@@framework/setHelper/exception";

export function setStateAction<State>(module: string, state: Partial<State>, name?: string): ActionType<ActionPayload<{}>> {
    return {
        name,
        type: SET_STATE_ACTION,
        payload: {module, state},
    };
}

export function setHelperLoadingAction(identifier: string, hasShow: boolean): ActionType<HelperLoadingPayload> {
    return {
        type: SET_HELPER_LOADING_ACTION,
        payload: {identifier, hasShow},
    };
}

export function setHelperLanguageAction(language: string): ActionType<string> {
    return {
        type: SET_HELPER_LANGUAGE_ACTION,
        payload: language,
    };
}

export function setHelperExceptionAction(exception: Exception): ActionType<Exception> {
    return {
        type: SET_HELPER_LANGUAGE_ACTION,
        payload: exception,
    };
}
