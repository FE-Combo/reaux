import {ComponentType} from "react";
import {Store} from "redux";
import {AppView as App, StateView, ErrorHandler} from "reaux";

export interface AppView extends App {
    store: Store<StateView>;
}

export interface RenderOptions {
    name: string;
    Component: ComponentType<any>;
    onError?: ErrorHandler;
    onInitialized?: () => Promise<any>;
}
