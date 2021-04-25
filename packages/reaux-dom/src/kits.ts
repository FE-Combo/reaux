import {DOMApp} from "./type";
import {setErrorAction} from "reaux";
import {compose, StoreEnhancer} from "redux";

export const isServer = !(typeof window !== "undefined" && window.document && window.document.createElement);

/**
 * Listen global error
 */
export function listenGlobalError(app: DOMApp) {
    if (typeof window !== "undefined") {
        window.onerror = (message: string | Event, source?: string, line?: number, column?: number, error?: Error): void => {
            console.error("Window Global Error");
            if (!error) {
                error = new Error(message.toString());
            }
            app.store.dispatch(setErrorAction(error));
        };
    }
}

/**
 * Redux DevTools plug-in support
 * Ref: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
 * @param enhancer
 */
export function devtools(enhancer: StoreEnhancer): StoreEnhancer {
    if (typeof window !== "undefined") {
        const extension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
        if (extension) {
            return compose(enhancer, extension({}));
        }
    }
    return enhancer;
}
