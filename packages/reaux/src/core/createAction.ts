import {ActionType, ModelLifeCycle, ExceptionHandler} from "../type";

type ActionCreator<H> = H extends (...args: infer P) => any ? ((...args: P) => ActionType<P>) : never;
type HandlerKeys<H> = {[K in keyof H]: H[K] extends (...args: any[]) => any ? K : never}[Exclude<keyof H, keyof ModelLifeCycle | keyof ExceptionHandler>];
type ActionCreators<H> = {readonly [K in HandlerKeys<H>]: ActionCreator<H[K]>};

export interface ActionsType {
    [key: string]: (...payload: any[]) => ActionType<any[]>;
}

interface ActionHandlers {
    [key: string]: (...args: any[]) => any;
}

/**
 * According handler propertyNames generate actions and actionsHandler
 * @param handler Module reference. e.g: const handler = new Module("name",{})
 */
export function createAction<H extends object & {moduleName: string}>(handler: H) {
    const moduleName = handler.moduleName;
    const keys = getPrototypeOfExceptConstructor(handler);
    const actions = {} as ActionCreators<H>;
    const actionHandlers = {} as ActionHandlers;
    keys.forEach(actionType => {
        const method = handler[actionType];
        const qualifiedActionType = `@@framework/actionHandler/${moduleName}/${actionType}`;
        actions[actionType] = (...payload: any[]) => ({type: qualifiedActionType, payload});
        actionHandlers[qualifiedActionType] = method.bind(handler);
    });

    return {actions, actionHandlers};
}

function getPrototypeOfExceptConstructor(object: object): string[] {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(object)).filter(key => key !== "constructor");
}
