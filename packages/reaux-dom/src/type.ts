import {ComponentType} from "react";
import {RouterState} from "connected-react-router";
import {State, ErrorState, LoadingState, ErrorBoundaryProps, ExceptionHandler} from "reaux";

export interface StateView extends State {
    "@error": ErrorState;
    "@loading": Partial<LoadingState>;
    router: RouterState;
}

export interface RenderOptions extends ExceptionHandler {
    name?: string;
    Component: ComponentType<any>;
    container?: Element | DocumentFragment;
    fallback?: ErrorBoundaryProps["fallback"];
}
