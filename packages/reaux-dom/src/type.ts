import {ComponentType} from "react";
import {RouterState} from "connected-react-router";
import {State, Exception} from "reaux";

export interface StateView extends State {
    router: RouterState;
}

export interface RenderOptions {
    Component: ComponentType<any>;
    onError?: (error: Exception) => any;
    onInitialized?: () => void;
}
