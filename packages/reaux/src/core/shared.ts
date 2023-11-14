import {ActionType, BaseModel} from "../type";

export function createActionType(namespace: string): string {
    return `@@framework/actionType/${namespace}`;
}

export function createResetActionType(namespace: string): string {
    return `@@framework/actionType/${namespace}/reset`;
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

export function resetModuleAction<State extends {}>(namespace: string, state: Partial<State>): ActionType<Partial<State>> {
    return {
        type: createResetActionType(namespace),
        payload: state,
    };
}

export function hasOwnLifecycle<H extends BaseModel>(handler: H, name: string): boolean {
    // ref: https://stackoverflow.com/questions/39282873/object-hasownproperty-yields-the-eslint-no-prototype-builtins-error-how-to
    return Object.prototype.hasOwnProperty.call(Object.getPrototypeOf(handler), name);
}

export function filterObject<S extends {}, K extends keyof S>(state: S, keys: K | K[]) {
    const filteredObject = {} as Pick<S, K>;
    if (typeof keys === "string") {
        keys = [keys];
    }
    for (const key of keys as K[]) {
        if (Object.prototype.hasOwnProperty.call(state, key)) {
            filteredObject[key] = state[key];
        } else {
            filteredObject[key] = undefined as S[K];
        }
    }
    return filteredObject;
}
