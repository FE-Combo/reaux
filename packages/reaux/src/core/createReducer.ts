import {Reducer, combineReducers, ReducersMapObject} from "redux";
import {StateView, LoadingState, ActionType, ActionPayload, LoadingActionType} from "../type";

export const SET_STATE_ACTION: string = "@@framework/setState";
export const LOADING_ACTION: string = "@@framework/loading";

export function setStateAction<State>(module: string, state: Partial<State>, type: string): ActionType<ActionPayload> {
    return {
        type,
        name: SET_STATE_ACTION,
        payload: {module, state},
    };
}

export function setLoadingAction(identifier: string, hasShow: boolean): ActionType<LoadingActionType> {
    return {
        type: LOADING_ACTION,
        payload: {identifier, hasShow},
    };
}

function appReducer(state: StateView["app"] = {}, action: ActionType<any>): StateView["app"] {
    if (action.name === SET_STATE_ACTION) {
        const {module, state: moduleState} = action.payload as ActionPayload;
        return {...state, [module]: {...state[module], ...moduleState}};
    }
    return state;
}

function loadingReducer(state: LoadingState = {}, action: ActionType<any>): LoadingState {
    if (action.type === LOADING_ACTION) {
        const payload = action.payload as LoadingActionType;
        const count = state[payload.identifier] || 0;
        return {
            ...state,
            [payload.identifier]: count + (payload.hasShow ? 1 : -1),
        };
    }
    return state;
}

export default function createReducer<T extends StateView>(callback?: (result: ReducersMapObject<StateView, any>) => ReducersMapObject<any, any>): Reducer<T> {
    const reducers: ReducersMapObject<StateView, any> = {app: appReducer, loading: loadingReducer};
    const resultReducers = callback ? callback(reducers) : reducers;
    return combineReducers(resultReducers);
}
