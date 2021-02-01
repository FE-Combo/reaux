import {Store, ReducersMapObject, Reducer} from "redux";
import {App, State} from "../type";

declare const window: any;

const isServer = !(typeof window !== "undefined" && window.document && window.document.createElement);

/**
 * App cache.
 * Create store, actionHandler, actionPHandlers(promise handler), actionGHandlers(generator handler), modulesName, exceptionHandler.
 * @param callback
 */
export function createApp(store: Store): App {
    return {
        isServer,
        serverRenderedModules: (!isServer && window?.__REAUX_DATA__?.serverRenderedModules) || [],
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
