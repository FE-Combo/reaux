import {Middleware, MiddlewareAPI} from "redux";
import {AppView} from "../type";

interface PMiddleware extends Middleware {
    run: (app: AppView) => void;
}

let cache: AppView;

export function createPromiseMiddleware(): PMiddleware {
    const middleware: PMiddleware = (api: MiddlewareAPI) => next => async actions => {
        next(actions);
        if (!cache.actionPHandlers) {
            throw new Error("Invoking action before execute promise middleware.run function only!!");
        }
        if (cache.actionPHandlers[actions.type]) {
            await cache.actionPHandlers[actions.type](actions.payload);
        }
    };

    middleware.run = function(app: AppView): any {
        cache = app;
    };
    return middleware;
}

const pMiddleware: PMiddleware = createPromiseMiddleware();

export {pMiddleware};
