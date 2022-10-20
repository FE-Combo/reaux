import {Middleware, MiddlewareAPI} from "redux";
import {createActionType} from "../core/shared";
import {ActionType, ActionHandlers} from "../type";

export function middleware(callback: () => ActionHandlers): Middleware {
    const middleware: Middleware = (api: MiddlewareAPI) => (next) => async (actions: ActionType) => {
        const actionHandlers = callback();
        if (actionHandlers[actions.type]) {
            try {
                await actionHandlers[actions.type](...actions.payload);
            } catch (error) {
                api.dispatch({
                    type: createActionType("@error"),
                    payload: {
                        name: error.name,
                        message: error.message,
                        stack: error.stack,
                    },
                });
                console.error(error);
            }
        }
        next(actions);
    };

    return middleware;
}
