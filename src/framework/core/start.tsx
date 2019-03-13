import {ConnectedRouter} from "connected-react-router";
import React, {ComponentType} from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {withRouter} from "react-router-dom";
import ErrorBoundary from "../component/ErrorBoundary";
import {createView, createController, Model} from "./mvc";
import app from "./app";

export function render(Component: ComponentType<any>, onInitialized: null | (() => void) = null): void {
    // Render one module(main).
    const rootElement: HTMLDivElement = document.createElement("div");
    rootElement.id = "framework-app-root";
    document.body.appendChild(rootElement);
    const WithRouterComponent = withRouter(Component);
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
            if (typeof onInitialized === "function") {
                onInitialized();
            }
        }
    );
}

export function register<H extends Model<any>>(handler: H, Component: ComponentType<any>): any {
    // Register each module.
    if (app.modules.hasOwnProperty(handler.module)) {
        throw new Error(`module is already registered, module=${handler.module}`);
    }
    app.modules[handler.module] = 1;

    const Controller = createController(handler);
    const View = createView(handler, Component, Controller);

    return {View, Controller};
}
