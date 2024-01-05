import {ComponentType} from "react";
import {RouterState} from "connected-react-router";
import {BrowserHistoryBuildOptions} from "history";
import {State, ErrorState, LoadingState, ErrorBoundaryProps, ExceptionHandler} from "reaux";

export interface StateView extends State {
    "@error": ErrorState;
    "@loading": Partial<LoadingState>;
    router: RouterState;
}

// TODO: support hashHistory and memoryHistory
interface RenderOptionsHistoryMode {
    type: "browserHistory";
    options?: BrowserHistoryBuildOptions;
}

export interface RenderOptions extends ExceptionHandler {
    name?: string;
    Component: ComponentType<any>;
    container: Element | DocumentFragment | boolean;
    fallback?: ErrorBoundaryProps["fallback"];
    historyMode?: RenderOptionsHistoryMode | null;
}
