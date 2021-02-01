import {ComponentType} from "react";
import {RouterState} from "connected-react-router";
import {State, Exception, App} from "reaux";
import {History} from "history";

export interface StateView extends State {
    router: RouterState;
}

export interface RenderOptions {
    Component: ComponentType<any>;
    onError?: (error: Exception) => any;
    onInitialized?: () => void;
    url?: string;
}

export interface DOMApp extends App {
    // use in client not server
    history?: History;
}

export interface ServerStartReturn {
    content: string;
    serverRenderedModules: string[];
    reduxState: StateView;
}
