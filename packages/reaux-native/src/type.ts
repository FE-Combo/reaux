import {ComponentType} from "react";
import {ErrorHandler} from "reaux";

export interface RenderOptions {
    name: string;
    Component: ComponentType<any>;
    onError?: ErrorHandler;
    onInitialized?: () => Promise<any>;
}
