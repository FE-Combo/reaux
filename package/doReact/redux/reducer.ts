import {Reducer, combineReducers} from "redux";
import {ActionTypeView, LoadingStateView, StateView, StateActionPayloadView, LoadingActionView} from "../type";
import {LocationChangeAction, RouterState} from "connected-react-router";
import {SET_STATE_ACTION, LOADING_ACTION} from "./action";

export function appReducer(state: StateView["app"] = {}, action: ActionTypeView<any>): StateView["app"] {
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

export function rootReducer(routerReducer: Reducer<RouterState, LocationChangeAction>): Reducer<StateView> {
    return combineReducers<StateView>({
        router: routerReducer,
        app: appReducer,
        loading: loadingReducer,
    });
}
