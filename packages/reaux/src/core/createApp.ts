import {Store} from "redux";
import {App} from "../type";

/**
 * App cache.
 * Create store, actionHandler, actionPHandlers(promise handler), actionGHandlers(generator handler), modulesName, exceptionHandler.
 * @param callback
 */
export function createApp(store: Store): App {
    return {
        store,
        actionPHandlers: {},
        actionGHandlers: {},
        // TODO: delete in v3.0
        actionHandlers: {},
        modules: {},
        exceptionHandler: {},
    };
}
