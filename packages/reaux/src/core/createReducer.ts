import {Reducer, combineReducers, ReducersMapObject} from "redux";
import {createActionType} from "./shared";
import {State, ActionType, ActionPayload} from "../type";

export function createModuleReducer(namespace: string): Reducer<ActionPayload, ActionType<ActionPayload>> {
    return (state: ActionPayload = {}, action: ActionType<ActionPayload>) => {
        const actionType = createActionType(namespace);
        switch (action.type) {
            case actionType:
                const nextState = {...state, ...action.payload};
                return nextState;
            default:
                return state;
        }
    };
}

export function createReducer(asyncReducers?: ReducersMapObject<State, any>): Reducer<State> {
    const reducers: ReducersMapObject<State, any> = {
        "@error": createModuleReducer("@error"),
        "@loading": createModuleReducer("@loading"),
        ...asyncReducers,
    };
    return combineReducers(reducers);
}
