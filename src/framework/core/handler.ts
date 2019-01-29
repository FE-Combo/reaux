import {LOCATION_CHANGE} from "connected-react-router";
import {Action as HistoryAction, Location} from "history";
import {Store} from "redux";
import {SagaIterator} from "redux-saga";
import {call, put, takeEvery} from "redux-saga/effects";
import {setStateAction, ERROR_ACTION_TYPE, errorAction} from "./reducer";
import {ActionView, StateView} from "./type";

let state: StateView = {app: {}, loading: {}, router: {} as any};

export interface LocationChangedEvent {
    location: Location;
    action: HistoryAction;
}

export abstract class Exception {
    protected constructor(public message: string) {}
}

export interface Listener {
    onInitialized?(): SagaIterator;
    onLocationChanged?(event: LocationChangedEvent): SagaIterator;
    onError?(error: Exception): SagaIterator;
}

export class Handler<S extends object> {
    readonly module: string;
    private readonly initialState: S;

    public constructor(module: string, initialState: S) {
        this.module = module;
        this.initialState = initialState;
    }

    protected get state(): Readonly<S> {
        return state.app[this.module];
    }

    protected *setState(newState: Partial<S>): SagaIterator {
        yield put(setStateAction(this.module, newState, `@@${this.module}/setState[${Object.keys(newState).join(",")}]`));
    }
}

export type ActionHandler = (...args: any[]) => SagaIterator;
export class Actor {
    // Storage primitive logic
    readonly effects: {[actionType: string]: ActionHandler} = {};
    readonly listeners: {[actionType: string]: ActionHandler[]} = {
        [LOCATION_CHANGE]: [],
        [ERROR_ACTION_TYPE]: [],
    };
}

export const storeListener = (store: Store<StateView>) => () => {
    state = store.getState();
};

export function* run(handler: ActionHandler, payload: any[]): SagaIterator {
    try {
        yield* handler(...payload);
    } catch (error) {
        console.error("Redux Saga Error");
        console.error(error);
        yield put(errorAction(error));
    }
}

export function* saga(handlers: Actor): SagaIterator {
    // trigger one time, in order to mount all actions.
    yield takeEvery("*", function*(action: ActionView<any>): SagaIterator {
        // Mounted on the program, Dispatch & yield put triggers every time.
        const listeners = handlers.listeners[action.type];
        if (listeners) {
            for (const listener of listeners) {
                yield call(run, listener, action.payload);
            }
            return;
        }
        const handler = handlers.effects[action.type];
        if (handler) {
            yield call(run, handler, action.payload);
        }
    });
}
