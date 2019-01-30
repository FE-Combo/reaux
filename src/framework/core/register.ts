import {Handler, run, setStateAction, ERROR_ACTION_TYPE, LOCATION_CHANGE} from "./redux";
import {AppView, ActionView, LocationChangedEvent, Listener, ActionCreators} from "./type";
import {SagaIterator} from "redux-saga";
import {call} from "redux-saga/effects";
import {getPrototypeOfExceptConstructor} from "../utils/object";

export function registerActions<H extends Handler<any>>(handler: H): ActionCreators<H> {
    // Generate action(type, payload)
    const actions = {};
    getPrototypeOfExceptConstructor(handler).forEach(actionType => {
        const qualifiedActionType = `${handler.module}/${actionType}`;
        actions[actionType] = (...payload: any[]): ActionView<any[]> => ({type: qualifiedActionType, payload});
    });
    return actions as ActionCreators<H>;
}

export function registerHandler(handler: Handler<any>, app: AppView) {
    // Store action.payload( expect onLocationChanged and onError ) and initial module redux state.
    getPrototypeOfExceptConstructor(handler).forEach(actionType => {
        const method = handler[actionType];
        const qualifiedActionType = `${handler.module}/${actionType}`;
        app.actionPayloadStore.effects[qualifiedActionType] = method.bind(handler);
    });
    app.store.dispatch(setStateAction(handler.module, (handler as any) /* "as any" to get private-readonly initialState */.initialState, `@@${handler.module}/initState`));
}

export function registerListener(handler: Handler<any>, app: AppView) {
    // Store action.payload( onLocationChanged and onError )
    const listener = handler as Listener;
    if (listener.onLocationChanged) {
        app.actionPayloadStore.listeners[LOCATION_CHANGE].push(listener.onLocationChanged.bind(handler));
    }
    if (listener.onError) {
        app.actionPayloadStore.listeners[ERROR_ACTION_TYPE].push(listener.onError.bind(handler));
    }
    app.sagaMiddleware.run(initializeListener, handler, app);
}

function* initializeListener(handler: Handler<any>, app: AppView): SagaIterator {
    // When module register trigger, one module trigger once time.
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
