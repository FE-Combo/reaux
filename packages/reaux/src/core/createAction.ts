import {ActionHandlers, ActionCreators} from "../type";

const buildinKeys = ["constructor", "dispatch", "setState", "rootState", "state", "resetState", "initState", "moduleName", "initialState"] as const;
type BuildinActionKeys = {
    readonly [K in keyof typeof buildinKeys]: typeof buildinKeys[K];
}[number];

function createActionHandlerType(moduleName: string, ActionHandlerType: string) {
    return `@@framework/actionsHandler(${moduleName}=>${ActionHandlerType})`;
}

/**
 * According handler propertyNames generate actions and actionHandlers
 * @param handler Module reference. e.g: const handler = new Module("name",{})
 */
export function createAction<H extends object & {moduleName: string}>(handler: H) {
    const moduleName = handler.moduleName;
    const keys = getPrototypeOfExceptBuildinKeys(handler);
    const actions = {} as Omit<ActionCreators<H>, BuildinActionKeys>;
    const actionHandlers = {} as ActionHandlers;
    keys.forEach((actionType) => {
        const method = handler[actionType] as (...args: any[]) => any;
        const qualifiedActionType = createActionHandlerType(moduleName, actionType);
        actions[actionType] = (...payload: any[]) => ({
            type: qualifiedActionType,
            payload,
        });
        if (typeof method === "function") {
            actionHandlers[qualifiedActionType] = method.bind(handler);
        } else {
            console.warn(`variable handler.[${method}] is not a function`);
        }
    });

    return {actions, actionHandlers};
}

function getPrototypeOfExceptBuildinKeys(object: object): string[] {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(object)).filter((key) => !buildinKeys.includes(key as BuildinActionKeys));
}
