import {AppView} from "../type";

/**
 * App cache.
 * Create actionHandler, actionPHandlers(promise handler), actionGHandlers(generator handler), modulesName, exceptionHandler.
 * @param callback
 */
export function createApp<T extends AppView>(callback?: (app: AppView) => T): T {
    const app = {
        actionPHandlers: {},
        actionGHandlers: {},
        actionHandler: {},
        modules: {},
        // TODO: Why use object ?????????
        exceptionHandler: {},
    } as T;
    return callback ? callback(app) : app;
}
