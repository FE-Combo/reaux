import {compose, StoreEnhancer} from "redux";
import {setErrorAction, Exception, App} from "reaux";

declare const window: any;

export function listenGlobalError(app: App, onError: (error: Exception) => any) {
    // 对客户端错误行为进行处理
    ErrorUtils.setGlobalHandler((error, isFatal) => {
        if (isFatal) {
            console.info("***** Fatal Error *****");
        }
        app.store.dispatch(setErrorAction(error));
    });
    app.exceptionHandler.onError = onError.bind(app);
}

export function devtools(enhancer: StoreEnhancer): StoreEnhancer {
    let composeEnhancers = compose;
    if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
        const extension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
        if (extension) {
            composeEnhancers = extension({
                // Ref: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
                actionsBlacklist: [],
            });
        }
    }
    return composeEnhancers(enhancer);
}
