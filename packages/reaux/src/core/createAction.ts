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

export default function createAction<H extends object & {moduleName: string}>(handler: H) {
    const moduleName = handler.moduleName;
    const keys = getPrototypeOfExceptConstructor(handler);
    const actions = {} as ActionCreators<H>;
    const actionsHandler = {} as ActionHandlers;
    keys.forEach(actionType => {
        const method = handler[actionType];
        const qualifiedActionType = `${moduleName}/${actionType}`;
        actions[actionType] = (...payload: any[]) => ({type: qualifiedActionType, payload});
        actionsHandler[qualifiedActionType] = method.bind(handler);
    });

    return {actions, actionsHandler};
}

function getPrototypeOfExceptConstructor(object: object): string[] {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(object)).filter(key => key !== "constructor");
}
