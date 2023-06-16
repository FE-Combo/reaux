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
        actionHandlers: {},
        exceptionHandler: {},
        asyncReducers: {} as ReducersMapObject<State, any>,
        injectReducer: (reducers: Reducer<State>) => store.replaceReducer(reducers),
    };
}
