import {ActionType} from "../type";

const ERROR_ACTION_TYPE = "@@framework/error";

export function createActionType(namespace: string): string {
    return `@@framework/actionType/${namespace}`;
}

export function createActionHandlerType(moduleName: string, ActionHandlerType: string) {
    return `@@framework/actionsHandler(${moduleName}=>${ActionHandlerType})`;
}

export function setModuleAction<State extends {}>(namespace: string, state: Partial<State>): ActionType<Partial<State>> {
    return {
        type: createActionType(namespace),
        payload: state,
    };
}

export function setErrorAction<Error>(error: Error): ActionType<Error> {
    return {
        type: ERROR_ACTION_TYPE,
        payload: error,
    };
}
