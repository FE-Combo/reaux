import {ActionType} from "../type";

export function createActionType(namespace: string): string {
    return `@@framework/actionType/${namespace}`;
}

export function createActionHandlerType(moduleName: string, ActionHandlerType: string) {
    return `@@framework/actionsHandler(${moduleName}=>${ActionHandlerType})`;
}

export function setModuleAction<State>(namespace: string, state: Partial<State>): ActionType<Partial<State>> {
    return {
        type: createActionType(namespace),
        payload: state,
    };
}
