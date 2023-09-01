import {ComponentType} from "react";
import {Middleware, MiddlewareAPI} from "redux";
import {connect as reactReduxConnect, MapStateToPropsParam, MapDispatchToPropsParam, MergeProps, InferableComponentEnhancer, ConnectedComponent} from "react-redux";
import {ConnectOptions} from "react-redux/es/components/connect";
import {createActionType} from "./shared";
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
