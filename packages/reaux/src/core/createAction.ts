import {ActionHandlers, ActionCreators} from "../type";

const buildinKeys = ["_cache", "constructor", "dispatch", "rootState", "state", "moduleName", "initialState"] as const;
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
    const result = Object.getOwnPropertyNames(mergeAncestors(object, 3)).filter((key) => !buildinKeys.includes(key as BuildinActionKeys));
    return result;
}

function mergeAncestors(object: Object, depth: number) {
    if (depth === 0) {
        return object;
    }

    const proto = Object.getPrototypeOf(object);
    if (!proto) {
        return object;
    }

    const parentObject: object = mergeAncestors(proto, depth - 1);

    // Merge parent and child properties, child properties override parent properties
    return {...parentObject, ...object};
}
