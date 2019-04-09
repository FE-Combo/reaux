import React, {ComponentType} from "react";
import app from "./app";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {withRouter} from "react-router-dom";
import ErrorBoundary from "../component/ErrorBoundary";
import {Model} from "./register";
import {ErrorListener} from "../util/exception";
import {setErrorAction} from "../redux/action";
import {ConnectedRouter} from "connected-react-router";

// 1.new () 代表是一个class 2.new 中参数为初始参数 Model(module/initialState) 3.Model<{}> & ErrorListener 代表 class 的继承
declare type ErrorHandlerModuleClass = new (name: string, state: {}) => Model<{}> & ErrorListener;

interface RenderOptions {
    Component: ComponentType<any>;
    ErrorHandlerModule: ErrorHandlerModuleClass;
    onInitialized: (() => void) | null;
}

export default function start(options: RenderOptions): void {
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

function listenGlobalError(ErrorHandlerModule: ErrorHandlerModuleClass) {
    // 对客户端错误行为进行处理(超时/4**)
    window.onerror = (message: string | Event, source?: string, line?: number, column?: number, error?: Error): void => {
        console.error("Window Global Error");
        if (!error) {
            error = new Error(message.toString());
        }
        app.store.dispatch(setErrorAction(error));
    };

    const errorHandler = new ErrorHandlerModule("errorHandler", {});
    app.errorHandler = errorHandler.onError.bind(errorHandler);
}
