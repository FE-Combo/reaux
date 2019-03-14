import {ConnectedRouter} from "connected-react-router";
import React, {ComponentType} from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {withRouter} from "react-router-dom";
import ErrorBoundary from "../component/ErrorBoundary";
import {createView, createController, Model} from "./mvc";
import {ErrorListener} from "./exception";
import app from "./app";

// 1.new () 代表是一个class 2.Model<{}> & ErrorListener 代表 new 之后的类型
type ErrorHandlerModuleClass = new () => Model<{}> & ErrorListener;

interface RenderOptions {
    Component: ComponentType<any>;
    ErrorHandlerModule: ErrorHandlerModuleClass;
    onInitialized: (() => void) | null;
}

export function render(options: RenderOptions): void {
    // Whole project trigger once(main module).
    const rootElement: HTMLDivElement = document.createElement("div");
    rootElement.id = "framework-app-root";
    document.body.appendChild(rootElement);
    const WithRouterComponent = withRouter(options.Component);
    ReactDOM.render(
        <Provider store={app.store}>
            <ErrorBoundary>
                <ConnectedRouter history={app.history}>
                    <WithRouterComponent />
                </ConnectedRouter>
            </ErrorBoundary>
        </Provider>,
        rootElement,
        () => {
            console.timeEnd("[framework] initialized");
            if (typeof options.onInitialized === "function") {
                options.onInitialized();
            }
        }
    );
    listenGlobalError(options.ErrorHandlerModule);
}

export function register<H extends Model<any>>(handler: H, Component: ComponentType<any>): any {
    // Trigger every module.
    if (app.modules.hasOwnProperty(handler.module)) {
        throw new Error(`module is already registered, module=${handler.module}`);
    }
    app.modules[handler.module] = 1;

    const Controller = createController(handler);
    const View = createView(Component, Controller);

    return {View, Controller};
}

function listenGlobalError(ErrorHandlerModule: ErrorHandlerModuleClass) {
    // 对客户端错误行为进行处理(超时/4**)
    window.onerror = (message: string | Event, source?: string, line?: number, column?: number, error?: Error): void => {
        console.error("Window Global Error");
        console.error(`Message: ${message.toString()}`);
        if (error) {
            console.error(error);
        }
        if (source && line && column) {
            console.error(`Source: ${source} (${line}, ${column})`);
        }
        if (!error) {
            error = new Error(message.toString());
        }

        const errorHandler = new ErrorHandlerModule();
        app.errorHandler = errorHandler.onError.bind(errorHandler);
    };
}
