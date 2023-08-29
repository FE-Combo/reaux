import {ComponentType} from "react";
import {RouterState} from "connected-react-router";
import {State, Exception, ErrorState, LoadingState} from "reaux";

export interface StateView extends State {
    "@error": ErrorState;
    "@loading": Partial<LoadingState>;
    router: RouterState;
}

export interface RenderOptions {
    name?: string;
    Component: ComponentType<any>;
    onError?: (error: Exception) => any;
    container?: Element | DocumentFragment;
}
