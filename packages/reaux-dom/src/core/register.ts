import {createReducer, createView, createAction, createModuleReducer, createActionType} from "reaux";
import {isServer} from "./kits";
import {DOMApp, RegisterReturn} from "./type";

/**
 * Register module create View and actions.
 * Trigger in every module.
 * @param paramApp
 */
export default function register(paramApp: DOMApp): RegisterReturn<any> {
    // @ts-ignore
    const that = this;
    paramApp.modules[that.handler.moduleName] = 0;
    (that.handler as any)._injectApp(paramApp);

    // register reducer
    const currentModuleReducer = createModuleReducer(that.handler.moduleName);
    paramApp.asyncReducers[that.handler.moduleName] = currentModuleReducer;
    paramApp.store.replaceReducer(createReducer(paramApp.asyncReducers));

    // initState can store on the client, but it will be lost on the server
    if (isServer) {
        paramApp.store.dispatch({type: createActionType(that.handler.moduleName), payload: that.handler.initState});
    }

    // register actions
    const {actions, actionHandlers} = createAction(that.handler);
    paramApp.actionHandlers = {...paramApp.actionHandlers, ...actionHandlers};
    paramApp.actionPHandlers = {...paramApp.actionPHandlers, ...actionHandlers};
    paramApp.actionGHandlers = {...paramApp.actionGHandlers, ...actionHandlers};
    that.result.actions = actions;
    that.result.component = createView(paramApp, that.handler, actions, that.component);
    return that.result;
}
