import {ComponentType} from "react";
import {History} from "history";
import {Store} from "redux";
import {RouterState} from "connected-react-router";
import {StateView as State, AppView as App, ErrorHandler} from "reaux";

export interface StateView extends State {
    router: RouterState;
}

export interface AppView extends App {
    store: Store<StateView>;
    history: History;
}
export interface RenderOptions {
    Component: ComponentType<any>;
    onError?: ErrorHandler;
    onInitialized?: () => void;
}
