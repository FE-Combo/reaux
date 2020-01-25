import {ComponentType} from "react";
import {Exception} from "reaux";

export interface RenderOptions {
    name: string;
    Component: ComponentType<any>;
    onError?: (error: Exception) => any;
    onInitialized?: () => Promise<any>;
}
