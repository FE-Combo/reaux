import {Reducer, combineReducers} from "redux";
import {ActionTypeView, LoadingStateView, StateActionPayloadView, LoadingActionView} from "../type";
import {LocationChangeAction, RouterState} from "connected-react-router";
import {SET_STATE_ACTION, LOADING_ACTION} from "./action";

// TODO: any should modify to BaseStateView

export function appReducer(state: any, action: ActionTypeView<any>): any {
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

export function rootReducer(routerReducer: Reducer<RouterState, LocationChangeAction>): Reducer<any> {
    return combineReducers<any>({
        router: routerReducer,
        app: appReducer,
        loading: loadingReducer,
    });
}
