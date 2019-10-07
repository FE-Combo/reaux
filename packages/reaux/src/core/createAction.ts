import {ActionType} from "../type";

export interface ActionsType {
    [key: string]: (...payload: any[]) => ActionType<any[]>;
}

interface ActionHandlers {
    [key: string]: (...args: any[]) => any;
}

interface ActionCreators {
    actions: ActionsType;
    actionsHandler: ActionHandlers;
}

export default function createAction<H extends object & {moduleName: string}>(handler: H): ActionCreators {
    const moduleName = handler.moduleName;
    const keys = getPrototypeOfExceptConstructor(handler);
    const actions = {} as ActionsType;
    const actionsHandler = {} as ActionHandlers;
    keys.forEach(actionType => {
        const method = handler[actionType];
        const qualifiedActionType = `${moduleName}/${actionType}`;
        actions[actionType] = (...payload) => ({type: qualifiedActionType, payload});
        actionsHandler[qualifiedActionType] = method.bind(handler);
    });

    return {actions, actionsHandler};
}

function getPrototypeOfExceptConstructor(object: object): string[] {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(object)).filter(key => key !== "constructor");
}
