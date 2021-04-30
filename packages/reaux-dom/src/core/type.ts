import {RouteProps} from "react-router-dom";
import {RouterState} from "connected-react-router";
import {State, Exception, App, ModuleReturn, BaseModel} from "reaux";
import {History} from "history";

export interface StateView extends State {
    router: RouterState;
}

interface Route extends RouteProps {
    namespace: string;
    module: () => Promise<any>;
    path?: string;
    // ref: https://github.com/pillarjs/path-to-regexp
    pathToRegexpOptions?: PathToRegexpOptions;
}

interface PathToRegexpOptions {
    sensitive?: boolean; // default: false
    strict?: boolean; // default false
    end?: boolean; // default true
    start?: boolean; // default true
    delimiter?: string; // default: '/#?'
    endsWith?: string;
    encode?: (x: string) => string; // default: x => x
    prefixes?: string; // default: ./
}
export interface RenderOptions {
    routes: Route[];
    onError?: (error: Exception) => any;
    onInitialized?: () => void;
    url?: string;
    isSSR?: boolean;
}

export interface DOMApp extends App {
    // use in client not server
    serverRenderedModules?: string[];
    history?: History;
}

export interface ServerStartReturn {
    content: string;
    reduxState: StateView;
    serverRenderedModules: string[];
}

export type Modules = Record<string, (app: DOMApp) => ModuleReturn<BaseModel>>;
