import {Middleware, MiddlewareAPI} from "redux";
import {AppView} from "../type";

interface GMiddleware extends Middleware {
    run: (app: AppView) => void;
}

let cache: AppView;

export function createGeneratorMiddleware(): GMiddleware {
    const middleware: GMiddleware = (api: MiddlewareAPI) => next => actions => {
        if (!cache.actionHandler) {
            throw new Error("Invoking action before execute middleware.run function only!!");
        }

        if (cache.actionHandler[actions.type]) {
            const g = cache.actionHandler[actions.type](actions.payload);
            let isDone = false;
            while (!isDone) {
                isDone = g.next().done;
            }
        }
        next(actions);
    };

    middleware.run = function(app: AppView): any {
        cache = app;
    };
    return middleware;
}

const gMiddleware: GMiddleware = createGeneratorMiddleware();

export {gMiddleware};
