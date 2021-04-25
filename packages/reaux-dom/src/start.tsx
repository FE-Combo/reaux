import React from "react";
import {Provider} from "react-redux";
import ReactDOM from "react-dom";
import Loadable from "react-loadable";
import {renderToString} from "react-dom/server";
import {History} from "history";
import {ConnectedRouter} from "connected-react-router";
import {ErrorBoundary, setErrorAction, Async} from "reaux";
import {Route, Switch, withRouter, StaticRouter} from "react-router-dom";
import {StateView, RenderOptions, DOMApp, ServerStartReturn, Modules, RegisterReturn} from "./type";
import {pathToRegexp} from "path-to-regexp";
import {isServer, listenGlobalError} from "./kits";

/**
 * Start client react-dom render.
 * @param options
 */
export async function clientStart(options: RenderOptions, modules: Modules, app: DOMApp, history?: History): Promise<null> {
    const {routes, onError, onInitialized, isSSR} = options;
    const requiredRoutes = getRequiredRoutes(routes, location.pathname);
    const mainModuleName = await initModules(requiredRoutes, modules);
    const afterBindAppModules = bindModulesWithApp(app, modules);
    const RouteComponent = createRouteComponent(routes, afterBindAppModules, modules, app);
    const WithRouterComponent = withRouter<any, any>(afterBindAppModules[mainModuleName].component);
    const application = (
        <Provider store={app.store!}>
            <ErrorBoundary setErrorAction={setErrorAction}>
                <ConnectedRouter history={history!}>
                    <WithRouterComponent RouteComponent={RouteComponent} />
                </ConnectedRouter>
            </ErrorBoundary>
        </Provider>
    );

    if (typeof onError === "function") {
        app.exceptionHandler.onError = onError.bind(app);
    }
    listenGlobalError(app);
    const rootElement = document.getElementById("reaux-app-root");
    const renderCallback = () => {
        if (typeof onInitialized === "function") {
            onInitialized();
        }
    };
    if (isSSR) {
        Loadable.preloadReady().then(() => {
            ReactDOM.hydrate(application, rootElement, renderCallback);
        });
    } else {
        ReactDOM.render(application, rootElement, renderCallback);
    }
    return null;
}

/**
 * Start server react-dom render.
 * @param options
 */
export async function serverStart(options: RenderOptions, modules: Modules, app: DOMApp): Promise<ServerStartReturn> {
    const {routes, url = "/"} = options;
    const mainModuleName = await initModules(routes, modules);
    const afterBindAppModules = bindModulesWithApp(app, modules);
    const RouteComponent = createRouteComponent(routes, afterBindAppModules, modules);
    const WithRouterComponent = withRouter<any, any>(afterBindAppModules[mainModuleName].component);
    const modulesName = [mainModuleName];
    const application = (
        <Loadable.Capture report={moduleName => modulesName.push(moduleName)}>
            <Provider store={app.store}>
                <ErrorBoundary setErrorAction={setErrorAction}>
                    <StaticRouter location={url} context={{}}>
                        <WithRouterComponent RouteComponent={RouteComponent} />
                    </StaticRouter>
                </ErrorBoundary>
            </Provider>
        </Loadable.Capture>
    );
    const content = renderToString(application);
    const initialReduxState: StateView = app.store.getState();
    return {content, serverRenderedModules: modulesName, reduxState: initialReduxState};
}

async function initModules(routes: RenderOptions["routes"], modules: Modules): Promise<string> {
    // init once
    // bind all modules in server
    // bind on demand in client
    const mainModule = routes.find(_ => _.entry)?.namespace;
    if (!mainModule) {
        // TODO:
        throw new Error("缺少入口module或者主入口namespace未命名");
    }
    const length = Object.keys(modules).length;
    if (length <= 0) {
        let i = 0;
        while (i < routes.length) {
            await routes[i].module();
            i++;
        }
    }
    return mainModule;
}

function getRequiredRoutes(routes: RenderOptions["routes"], url: string): RenderOptions["routes"] {
    const pathRegexps = routes.map(_ => pathToRegexp(_.path, [], {strict: !!_?.exact, ...(_?.pathToRegexpOptions ?? {})}));
    const routeIndex = pathRegexps.findIndex(_ => _.test(url));
    const routeModuleName = routes[routeIndex].namespace;
    if (routeIndex === -1 || !routeModuleName) {
        throw new Error("未找到url对应module");
    }
    return [routes.find(_ => _.entry)!, routes[routeIndex]].filter(_ => _);
}

function bindModulesWithApp(app: DOMApp, modules: Modules) {
    return Object.keys(modules).reduce((pre, key) => {
        pre[key] = modules[key](app);
        const a = modules[key](app);
        return pre;
    }, {} as Record<string, RegisterReturn<any>>);
}

function createRouteComponent(routes: RenderOptions["routes"], afterBindAppModules: Record<string, RegisterReturn<any>>, modules: Modules, app?: DOMApp) {
    const clientAfterBindAppModule: Record<string, Promise<{default: () => RegisterReturn<any>}>> = {};
    const keys = Object.keys(afterBindAppModules);
    const clientToBeLoadedRoutes = routes.reduce((pre, next) => {
        if (!keys.includes(next.namespace)) {
            pre.push(next);
        }
        return pre;
    }, [] as RenderOptions["routes"]);

    const render = (namespace: string) => {
        const module = routes.find(_ => _.namespace === namespace)?.module!;
        const Component = Async(() => {
            if (!clientAfterBindAppModule[namespace]) {
                clientAfterBindAppModule[namespace] = module().then(_ => {
                    if (app) {
                        modules[namespace](app);
                    }
                    return _;
                });
            }
            return clientAfterBindAppModule[namespace];
        });
        return () => <Component />;
    };

    return () => (
        <Switch>
            {routes.map(route => {
                const {namespace, render, entry, module, ...restProps} = route;
                const Component = afterBindAppModules?.[namespace]?.component;
                return !entry && Component && <Route key={namespace} {...restProps} render={() => <Component />} />;
            })}
            {!isServer && clientToBeLoadedRoutes.map(_ => <Route key={_.namespace} {..._} render={render(_.namespace)} />)}
        </Switch>
    );
}
