import createSagaMiddleware from "redux-saga";
import {History} from "history";
import {Reducer, Store, applyMiddleware, createStore, Middleware} from "redux";
import {connectRouter, routerMiddleware} from "connected-react-router";
import {createReducer, createApp, saga} from "reaux";
import {StateView, DOMApp} from "./type";
import {isServer, devtools} from "./kits";

/**
 * Create history, reducer, middleware, store, redux-saga, app cache
 */
export function genApp(history: History): DOMApp {
    const asyncReducer: any = {};
    const preloadedState = (typeof window !== "undefined" && (window as any)?.__REAUX_DATA__?.ReduxState) || {};
    const sagaMiddleware = createSagaMiddleware();
    const reduxMiddleware: Middleware[] = [sagaMiddleware];
    if (!isServer) {
        const routerReducer = connectRouter(history);
        asyncReducer.router = routerReducer;
        const historyMiddleware = routerMiddleware(history);
        reduxMiddleware.push(historyMiddleware);
    }
    const reducer: Reducer<StateView> = createReducer(asyncReducer as any) as any;
    const store: Store<StateView> = createStore(reducer, preloadedState, devtools(applyMiddleware(...reduxMiddleware)));
    const app = createApp(store);
    app.asyncReducers = {...app.asyncReducers, ...asyncReducer} as any;
    sagaMiddleware.run(saga, app);
    // TODO:
    // pMiddleware.run(app);
    // gMiddleware.run(app);
    return app;
}
