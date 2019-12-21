import {Middleware, MiddlewareAPI} from "redux";
import {App} from "../type";

interface sagaMiddleware extends Middleware {
    run: (app: App) => void;
}

let appCache: App;

export function createPromiseMiddleware(): sagaMiddleware {
    const middleware: sagaMiddleware = (api: MiddlewareAPI) => next => async actions => {
        next(actions);
        if (!appCache || !appCache.actionPHandlers) {
            throw new Error("Invoking action before execute promise middleware.run function only!!");
        }
        if (appCache.actionPHandlers[actions.type]) {
            // TODO: Unified runtime error handling
            await appCache.actionPHandlers[actions.type](actions.payload);
        }
    };

    middleware.run = function(app: App): any {
        appCache = app;
    };
    return middleware;
}

export function createGeneratorMiddleware(): sagaMiddleware {
    const middleware: sagaMiddleware = (api: MiddlewareAPI) => next => actions => {
        next(actions);
        if (!appCache || !appCache.actionGHandlers) {
            throw new Error("Invoking action before execute generator middleware.run function only!!");
        }
        if (appCache.actionGHandlers[actions.type]) {
            const g = appCache.actionGHandlers[actions.type](actions.payload);
            let isDone = false;
            while (!isDone) {
                isDone = g.next().done;
            }
        }
    };

    middleware.run = function(app: App): any {
        appCache = app;
    };
    return middleware;
}

const take: any = function*() {
    yield;
};
const put: any = function*() {
    yield;
};
const call: any = function*() {
    yield;
};
const folk: any = function*() {
    yield;
};
const spawn: any = function*() {
    yield;
};

// TODO:generator effect
const effects = {
    take,
    put,
    call,
    folk,
    spawn,
};

const pMiddleware: sagaMiddleware = createPromiseMiddleware();

const gMiddleware: sagaMiddleware = createGeneratorMiddleware();

// Reference: https://github.com/pburtchaell/redux-promise-middleware
// Reference: https://github.com/redux-saga/redux-saga
export {pMiddleware, gMiddleware, effects};
