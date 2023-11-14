import {ComponentType} from "react";
import {ErrorBoundaryProps, ExceptionHandler} from "reaux";

export interface RenderOptions extends ExceptionHandler {
    name: string;
    Component: ComponentType<any>;
    onInitialized?: () => Promise<any>;
    fallback?: ErrorBoundaryProps["fallback"];
}
