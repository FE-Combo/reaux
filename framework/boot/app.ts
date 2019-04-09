import {connectRouter, routerMiddleware} from "connected-react-router";
import {createBrowserHistory} from "history";
import {applyMiddleware, createStore, Reducer, Store, compose, StoreEnhancer} from "redux";
import createSagaMiddleware from "redux-saga";
import {rootReducer} from "../redux/reducer";
import {AppView, StateView, ActionTypeView, ActionHandler} from "../type";
import {SagaIterator} from "redux-saga";
import {call, put, takeEvery} from "redux-saga/effects";
import {setErrorAction, ERROR_ACTION_TYPE} from "../redux/action";

console.time("[framework] initialized");

// TODO: 变量app存在隐患（副作用）

function createApp(): AppView {
    const history = createBrowserHistory();
    const actionHandler: {[type: string]: ActionHandler} = {};
    const sagaMiddleware = createSagaMiddleware();
    const reducer: Reducer<StateView> = rootReducer(connectRouter(history));
    const store: Store<StateView> = createStore(reducer, devtools(applyMiddleware(routerMiddleware(history), sagaMiddleware)));
    sagaMiddleware.run(function* saga() {
        // Register saga, listener all actions
        yield takeEvery("*", function*(action: ActionTypeView<any>): SagaIterator {
            // Trigger by dispatch or yield put
            if (action.type === ERROR_ACTION_TYPE) {
                if (app.errorHandler) {
                    yield* app.errorHandler(action.payload);
                } else {
                    console.error("Errors occurred, no bugs were monitored");
                }
            } else {
                const handler = app.actionHandler[action.type];
                if (handler) {
                    yield call(run, handler, action.payload);
                }
            }
        });
    });
    return {history, store, sagaMiddleware, actionHandler, modules: {}, errorHandler: null};
}

/* 执行 actionHandler (执行函数) */
function* run(handler: ActionHandler, payload: any[]): SagaIterator {
    // handler: 函数体， payload: 函数参数
    try {
        yield* handler(...payload);
    } catch (error) {
        console.error("Redux Saga Error");
        console.error(error);
        yield put(setErrorAction(error));
    }
}

function devtools(enhancer: StoreEnhancer): StoreEnhancer {
    // Add Redux DevTools plug-in support
    // Ref: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
    const extension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
    if (extension) {
        return compose(
            enhancer,
            extension({})
        );
    }
    return enhancer;
}

const app = createApp();
export default app;
