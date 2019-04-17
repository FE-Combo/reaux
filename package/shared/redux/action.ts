import {ActionTypeView, StateActionPayloadView, LoadingActionView, BaseAppView} from "../type";
import {Exception, RuntimeException} from "../util/exception";
import {BaseModel} from "../component/Model";
import {getPrototypeOfExceptConstructor} from "../tool/object";

export const SET_STATE_ACTION: string = "@@framework/setState";
export const LOADING_ACTION: string = "@@framework/loading";
export const ERROR_ACTION_TYPE: string = "@@framework/error";

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
    // 1.return actions(存储方法名与方法参数)、2.存储方法对应逻辑
    const moduleName = handler.moduleName;
    const keys = getPrototypeOfExceptConstructor(handler);
    const actions: {[type: string]: (...payload: any[]) => ActionTypeView<any[]>} = {};
    keys.forEach(actionType => {
        const method = handler[actionType];
        const qualifiedActionType = `${moduleName}/${actionType}`;
        app.actionHandler[qualifiedActionType] = method.bind(handler);
        actions[actionType] = (...payload: any[]): ActionTypeView<any[]> => ({type: qualifiedActionType, payload});
    });
    return actions;
}
