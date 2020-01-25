import {Store, ReducersMapObject, Reducer} from "redux";
import {App, State} from "../type";

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
        asyncReducers: {} as ReducersMapObject<State, any>,
        injectReducer: (reducers: Reducer<State>) => store.replaceReducer(reducers),
    };
}
