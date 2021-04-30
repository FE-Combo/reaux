import React from "react";
import {Provider} from "react-redux";
import ReactDOM from "react-dom";
import {renderToString} from "react-dom/server";
import {History} from "history";
import {ConnectedRouter} from "connected-react-router";
import {ErrorBoundary, setErrorAction, Async, BaseModel, AsyncPromiseWrap, ModuleReturn} from "reaux";
import {Route, Switch, withRouter, StaticRouter} from "react-router";
import {StateView, RenderOptions, DOMApp, ServerStartReturn, Modules} from "./type";
import {pathToRegexp} from "path-to-regexp";
import {isServer, listenGlobalError} from "./kits";

/**
 * Start client react-dom render.
 * @param options
 * @param modules
 * @param app
 * @param history
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
        ReactDOM.hydrate(application, rootElement, renderCallback);
    } else {
        ReactDOM.render(application, rootElement, renderCallback);
    }
    return null;
}

/**
 * Start server react-dom render.
 * @param options
 * @param modules
 * @param app
 */
export async function serverStart(options: RenderOptions, modules: Modules, app: DOMApp): Promise<ServerStartReturn> {
    const {routes, url = "/"} = options;
    const mainModuleName = await initModules(routes, modules);
    const serverRenderedModules: string[] = [mainModuleName];
    const afterBindAppModules = bindModulesWithApp(app, modules);
    const RouteComponent = createRouteComponent(routes, afterBindAppModules, modules, app, serverRenderedModules);
    const WithRouterComponent = withRouter<any, any>(afterBindAppModules[mainModuleName].component);
    const application = (
        <Provider store={app.store}>
            <ErrorBoundary setErrorAction={setErrorAction}>
                <StaticRouter location={url} context={{}}>
                    <WithRouterComponent RouteComponent={RouteComponent} />
                </StaticRouter>
            </ErrorBoundary>
        </Provider>
    );
    const content = renderToString(application);
    const initialReduxState: StateView = app.store.getState();
    return {content, reduxState: initialReduxState, serverRenderedModules};
}

async function initModules(routes: RenderOptions["routes"], modules: Modules): Promise<string> {
    // init once
    // bind all modules in server
    // bind on demand in client
    const mainModule = routes.find(_ => !_.path)?.namespace;
    if (!mainModule) {
        throw new Error("Missing entry module");
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
    const nextRoutes = routes.filter(_ => _.path);
    const pathRegexps = nextRoutes.map(_ => pathToRegexp(_.path!, [], {strict: !!_?.exact, ...(_?.pathToRegexpOptions ?? {})}));
    const routeIndex = pathRegexps.findIndex(_ => _.test(url));
    return [routes.find(_ => !_.path)!, nextRoutes?.[routeIndex]].filter(_ => _);
}

function bindModulesWithApp(app: DOMApp, modules: Modules) {
    return Object.keys(modules).reduce((pre, key) => {
        pre[key] = modules[key](app);
        return pre;
    }, {} as Record<string, ModuleReturn<BaseModel>>);
}

function createRouteComponent(routes: RenderOptions["routes"], afterBindAppModules: Record<string, ModuleReturn<any>>, modules: Modules, app: DOMApp, serverRenderedModules?: string[]) {
    const clientAfterBindAppModule: Record<string, Promise<AsyncPromiseWrap>> = {};
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
                const {namespace, render, path, module, ...restProps} = route;
                const Component = afterBindAppModules?.[namespace]?.component;
                return (
                    path &&
                    Component && (
                        <Route
                            key={namespace}
                            path={path}
                            {...restProps}
                            render={() => {
                                isServer && serverRenderedModules!.push(namespace);
                                return <Component />;
                            }}
                        />
                    )
                );
            })}
            {!isServer && clientToBeLoadedRoutes.map(_ => <Route key={_.namespace} {..._} render={render(_.namespace)} />)}
        </Switch>
    );
}
