import {Reducer, combineReducers, ReducersMapObject} from "redux";
import {createActionType, createResetActionType} from "./shared";
import {State, ActionType, ActionPayload} from "../type";

export function createModuleReducer(namespace: string, initialState: Record<string, unknown> = {}): Reducer<ActionPayload, ActionType<ActionPayload>> {
    return (state: ActionPayload = initialState, action: ActionType<ActionPayload>) => {
        const actionType = createActionType(namespace);
        const resetActionType = createResetActionType(namespace);

        switch (action.type) {
            case actionType: {
                const nextState = {...state, ...action.payload};
                return nextState;
            }
            case resetActionType: {
                return action.payload;
            }
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
