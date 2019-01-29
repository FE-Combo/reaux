import {Handler, run, setStateAction, ERROR_ACTION_TYPE, LOCATION_CHANGE} from "./redux";
import {AppView, ActionView, LocationChangedEvent, Listener, ActionCreators} from "./type";
import {SagaIterator} from "redux-saga";
import {call} from "redux-saga/effects";
import {getPrototypeOfExceptConstructor} from "../utils/object";

export function registerHandler(handler: Handler<any>, app: AppView) {
    getPrototypeOfExceptConstructor(handler).forEach(actionType => {
        const method = handler[actionType];
        const qualifiedActionType = `${handler.module}/${actionType}`;
        app.actor.effects[qualifiedActionType] = method.bind(handler);
    });
    // "as any" to get private-readonly initialState
    const initialState = (handler as any).initialState;
    app.store.dispatch(setStateAction(handler.module, initialState, `@@${handler.module}/initState`));
}

export function registerListener(handler: Handler<any>, app: AppView) {
    const listener = handler as Listener;
    if (listener.onLocationChanged) {
        app.actor.listeners[LOCATION_CHANGE].push(listener.onLocationChanged.bind(handler));
    }
    if (listener.onError) {
        app.actor.listeners[ERROR_ACTION_TYPE].push(listener.onError.bind(handler));
    }
    app.sagaMiddleware.run(initializeListener, handler, app);
}

export function registerActions<H extends Handler<any>>(handler: H): ActionCreators<H> {
    // obtain type & params
    const actions = {};
    getPrototypeOfExceptConstructor(handler).forEach(actionType => {
        const qualifiedActionType = `${handler.module}/${actionType}`;
        actions[actionType] = (...payload: any[]): ActionView<any[]> => ({type: qualifiedActionType, payload});
    });
    return actions as ActionCreators<H>;
}

function* initializeListener(handler: Handler<any>, app: AppView): SagaIterator {
    // Only manually modify the URL trigger, Several modules are loaded several times during initialization.
    const listener = handler as Listener;
    if (listener.onInitialized) {
        yield call(run, listener.onInitialized.bind(handler), []);
    }
    if (listener.onLocationChanged) {
        const event: LocationChangedEvent = {location: app.history.location, action: "PUSH"};
        yield call(run, listener.onLocationChanged.bind(handler), [event]);
    }
    app.modules[handler.module] = true;
}
