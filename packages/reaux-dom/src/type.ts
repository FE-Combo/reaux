import {ComponentType} from "react";
import {RouterState} from "connected-react-router";
import {State, ErrorHandler} from "reaux";

export interface StateView extends State {
    router: RouterState;
}

export interface RenderOptions {
    Component: ComponentType<any>;
    onError?: ErrorHandler;
    onInitialized?: () => void;
}
