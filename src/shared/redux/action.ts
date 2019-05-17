import {Exception, RuntimeException, ErrorListener} from "../util/exception";
import {getPrototypeOfExceptConstructor} from "../../kit";
import {ActionTypeView, StateActionPayloadView, LoadingActionView, BaseAppView, BaseModel, BaseModelLifeCycle} from "../type";
import {SagaIterator} from "redux-saga";

export const SET_STATE_ACTION: string = "@@framework/setState";
export const LOADING_ACTION: string = "@@framework/loading";
export const ERROR_ACTION_TYPE: string = "@@framework/error";

type ActionCreator<H> = H extends (...args: infer P) => SagaIterator ? ((...args: P) => ActionTypeView<P>) : never;
type HandlerKeys<H> = {[K in keyof H]: H[K] extends (...args: any[]) => SagaIterator ? K : never}[Exclude<keyof H, keyof BaseModelLifeCycle | keyof ErrorListener>];
type ActionCreators<H> = {readonly [K in HandlerKeys<H>]: ActionCreator<H[K]>};

export function setStateAction(module: string, state: object, type: string): ActionTypeView<StateActionPayloadView> {
    return {
        type,
        name: SET_STATE_ACTION,
        payload: {module, state},
    };
}

export function setLoadingAction(identifier: string, hasShow: boolean): ActionTypeView<LoadingActionView> {
    return {
        type: LOADING_ACTION,
        payload: {identifier, hasShow},
    };
}

export function setErrorAction(error: any): ActionTypeView<Exception> {
    const exception: Exception = error instanceof Exception ? error : new RuntimeException(error && error.message ? error.message : "unknown error");
    return {
        type: ERROR_ACTION_TYPE,
        payload: exception,
    };
}

export function createLogicActions<H extends BaseModel<{}>>(app: BaseAppView, handler: H) {
    const moduleName = handler.moduleName;
    const keys = getPrototypeOfExceptConstructor(handler);
    const actions = {};
    keys.forEach(actionType => {
        const method = handler[actionType];
        const qualifiedActionType = `${moduleName}/${actionType}`;
        app.actionHandler[qualifiedActionType] = method.bind(handler);
        actions[actionType] = (...payload: any[]): ActionTypeView<any[]> => ({type: qualifiedActionType, payload});
    });

    return actions as ActionCreators<H>;
}
