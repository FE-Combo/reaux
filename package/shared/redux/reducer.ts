import {Reducer, combineReducers, ReducersMapObject} from "redux";
import {SET_STATE_ACTION, LOADING_ACTION} from "./action";
import {ActionTypeView, LoadingStateView, StateActionPayloadView, LoadingActionView, BaseStateView} from "../type";

export function appReducer(state: BaseStateView["app"] = {}, action: ActionTypeView<any>): BaseStateView["app"] {
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

export function rootReducer(routerReducer?: Reducer<any, any>): Reducer<BaseStateView> {
    const reducers: ReducersMapObject<BaseStateView, any> = {app: appReducer, loading: loadingReducer};
    if (routerReducer) {
        reducers.router = routerReducer;
    }
    return combineReducers<BaseStateView>(reducers);
}
