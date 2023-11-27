import {ComponentType} from "react";
import {compose, MiddlewareAPI, Middleware, AnyAction, Dispatch} from "redux";
import {connect as reactReduxConnect, MapStateToPropsParam, MapDispatchToPropsParam, MergeProps, InferableComponentEnhancer, ConnectedComponent} from "react-redux";
import {ConnectOptions} from "react-redux/es/components/connect";
import {createActionType} from "./shared";
import {ActionType, ActionHandlers} from "../type";

export function promiseMiddleware(callback: () => ActionHandlers): Middleware {
    const middleware: Middleware = (api: MiddlewareAPI) => (next) => async (actions: ActionType) => {
        const actionHandlers = callback();
        if (actionHandlers[actions.type]) {
            try {
                await actionHandlers[actions.type](...actions.payload);
            } catch (error) {
                api.dispatch({
                    type: createActionType("@error"),
                    payload: {
                        type: "redux-action",
                        message: error.message,
                        stack: error.stack,
                    },
                });
                console.error("redux error:", error);
            }
        }
        next(actions);
    };

    return middleware;
}

interface HanderRequest<A, P> {
    actions: A;
    View: React.ComponentType<P>;
    proxyLifeCycle: <PP>(View: ComponentType<PP>) => React.ComponentType<PP>;
}

interface HanderResponse<A, P> {
    actions: A;
    View: React.ComponentType<P>;
    proxyLifeCycle: <PP>(View: ComponentType<PP>) => React.ComponentType<PP>;
}
export function connect<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, TMergedProps = {}, State = unknown>(
    mapStateToProps?: MapStateToPropsParam<TStateProps, TOwnProps, State>,
    mapDispatchToProps?: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
    mergeProps?: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>,
    options?: ConnectOptions<State, TStateProps, TOwnProps, TMergedProps>
) {
    return function <A, P extends {}>(handler: HanderRequest<A, P>): HanderResponse<A, P> {
        const {actions, View, proxyLifeCycle} = handler;
        return {
            actions,
            View: reactReduxConnect(mapStateToProps!, mapDispatchToProps!, mergeProps!, options!)(View as ConnectedComponent<React.ComponentType<InferableComponentEnhancer<P>>, any>) as unknown as React.ComponentType<P>,
            proxyLifeCycle,
        };
    };
}

interface DynamicMiddleware {
    enhancer: Middleware;
    addMiddleware: (...middlewares: Middleware[]) => void;
    removeMiddleware: (middleware: Middleware) => void;
    resetMiddlewares: () => void;
}

export const createDynamicMiddleware = (): DynamicMiddleware => {
    let allDynamicMiddlewares: Middleware[] = [];
    let allApplyedDynamicMiddlewares: ReturnType<Middleware>[] = [];
    let store: MiddlewareAPI;

    const enhancer: DynamicMiddleware["enhancer"] = (_store) => {
        store = _store;
        return (next) => (action: AnyAction) => {
            return (compose(...allApplyedDynamicMiddlewares)(next) as Dispatch)(action);
        };
    };

    const addMiddleware: DynamicMiddleware["addMiddleware"] = (...middlewares) => {
        const nextMiddleware = middlewares.map((middleware) => middleware(store));
        allApplyedDynamicMiddlewares.push(...nextMiddleware);
        allDynamicMiddlewares.push(...middlewares);
    };

    const removeMiddleware: DynamicMiddleware["removeMiddleware"] = (middleware) => {
        const index = allDynamicMiddlewares.findIndex((_) => _ === middleware);

        if (index === -1) {
            // eslint-disable-next-line no-console
            console.error("Middleware does not exist!", middleware);

            return;
        }

        allDynamicMiddlewares = allDynamicMiddlewares.filter((_, index) => index !== index);
        allApplyedDynamicMiddlewares = allApplyedDynamicMiddlewares.filter((_, index) => index !== index);
    };

    const resetMiddlewares: DynamicMiddleware["resetMiddlewares"] = () => {
        allApplyedDynamicMiddlewares = [];
        allDynamicMiddlewares = [];
    };

    return {
        enhancer,
        addMiddleware,
        removeMiddleware,
        resetMiddlewares,
    };
};

export const {enhancer: dynamicMiddleware, addMiddleware: dynamicAddMiddleware, removeMiddleware: dynamicRemoveMiddleware, resetMiddlewares: dynamicResetMiddlewares} = createDynamicMiddleware();
