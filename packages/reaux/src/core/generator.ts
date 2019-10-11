import {Middleware, MiddlewareAPI} from "redux";
import {AppView} from "../type";

interface GMiddleware extends Middleware {
    run: (app: AppView) => void;
}

let cache: AppView;

export function createGeneratorMiddleware(): GMiddleware {
    const middleware: GMiddleware = (api: MiddlewareAPI) => next => actions => {
        next(actions);
        if (!cache.actionGHandlers) {
            throw new Error("Invoking action before execute generator middleware.run function only!!");
        }
        if (cache.actionGHandlers[actions.type]) {
            const g = cache.actionGHandlers[actions.type](actions.payload);
            let isDone = false;
            while (!isDone) {
                isDone = g.next().done;
            }
        }
    };

    middleware.run = function(app: AppView): any {
        cache = app;
    };
    return middleware;
}

const gMiddleware: GMiddleware = createGeneratorMiddleware();

export {gMiddleware};
