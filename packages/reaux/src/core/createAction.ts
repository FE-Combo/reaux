import {ActionHandlers, ActionCreators} from "../type";

const extraBuildinKeys = ["setState", "resetState"];

// Component does not allow direct use of the following properties
const omitBuildinKeys = ["constructor", "dispatch", "rootState", "state", "moduleName", "initialState"] as const;
type OmitBuildinActionKeys = {
    readonly [K in keyof typeof omitBuildinKeys]: typeof omitBuildinKeys[K];
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
    const keys = [...getPrototypeOfExceptBuildinKeys(handler), ...extraBuildinKeys];
    const actions = {} as Omit<ActionCreators<H>, OmitBuildinActionKeys>;
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

// Only the data on the prototype can be obtained but not all the data on the prototype chain, so use `injectKeys` to inject the necessary keys in the prototype chain
function getPrototypeOfExceptBuildinKeys(object: object): string[] {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(object)).filter((key) => !omitBuildinKeys.includes(key as OmitBuildinActionKeys));
}
