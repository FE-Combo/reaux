(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(44);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "register", function() { return _src_core__WEBPACK_IMPORTED_MODULE_0__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "start", function() { return _src_core__WEBPACK_IMPORTED_MODULE_0__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useHelper", function() { return _src_core__WEBPACK_IMPORTED_MODULE_0__["c"]; });

/* harmony import */ var _src_components_Route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41);
/* harmony import */ var _src_core_sagaCall__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42);
/* harmony import */ var _src_core_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(43);
/* harmony import */ var _src_core_type__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_src_core_type__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (checked) */ if(__webpack_require__.o(_src_core_type__WEBPACK_IMPORTED_MODULE_3__, "Model")) __webpack_require__.d(__webpack_exports__, "Model", function() { return _src_core_type__WEBPACK_IMPORTED_MODULE_3__["Model"]; });

/* harmony import */ var reaux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Model", function() { return reaux__WEBPACK_IMPORTED_MODULE_4__["c"]; });








/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Route */
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var reaux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);




var Route = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "c"])(Route, _super);
    function Route() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Route.prototype.render = function () {
        var _a = this.props, component = _a.component, withErrorBoundary = _a.withErrorBoundary, accessCondition = _a.accessCondition, unauthorizedRedirectTo = _a.unauthorizedRedirectTo, restProps = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __rest */ "e"])(_a, ["component", "withErrorBoundary", "accessCondition", "unauthorizedRedirectTo"]);
        var TargetComponent = component;
        var routeNode = (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_3__[/* Route */ "b"], Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, restProps, { render: function (props) {
                return accessCondition ? react__WEBPACK_IMPORTED_MODULE_1__["createElement"](TargetComponent, Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, props)) : react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_3__[/* Redirect */ "a"], { to: { pathname: unauthorizedRedirectTo } });
            } })));
        return withErrorBoundary ? react__WEBPACK_IMPORTED_MODULE_1__["createElement"](reaux__WEBPACK_IMPORTED_MODULE_2__[/* ErrorBoundary */ "b"], { setErrorAction: reaux__WEBPACK_IMPORTED_MODULE_2__[/* setErrorAction */ "k"] }, routeNode) : routeNode;
    };
    Route.defaultProps = {
        exact: true,
        withErrorBoundary: true,
        accessCondition: true,
        unauthorizedRedirectTo: "/",
    };
    return Route;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export call */
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);


var call = function (fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var result;
    // Same as fn (parameter), but store its promised return into "result"
    var wrappedFn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return fn.apply(void 0, args).then(function (_) {
            result = _;
            return _;
        });
    };
    var effect = redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__[/* call */ "a"].apply(null, Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __spreadArrays */ "f"])([wrappedFn], args));
    effect.result = function () {
        if (result === undefined) {
            throw new Error("Effect has not been yielded");
        }
        return result;
    };
    return effect;
};


/***/ }),

/***/ 43:
/***/ (function(module, exports) {



/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__(2);

// EXTERNAL MODULE: /Applications/project/own/reaux/packages/reaux/index.ts + 13 modules
var reaux = __webpack_require__(7);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/redux/es/redux.js
var redux = __webpack_require__(13);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/history/esm/history.js + 2 modules
var esm_history = __webpack_require__(11);

// CONCATENATED MODULE: /Applications/project/own/reaux/packages/reaux-dom/src/core/kits.ts



var isServer = !(typeof window !== "undefined" && window.document && window.document.createElement);
/**
 * Listen global error
 */
function listenGlobalError(app) {
    if (typeof window !== "undefined") {
        window.onerror = function (message, source, line, column, error) {
            console.error("Window Global Error");
            if (!error) {
                error = new Error(message.toString());
            }
            app.store.dispatch(Object(reaux["k" /* setErrorAction */])(error));
        };
    }
}
/**
 * Redux DevTools plug-in support
 * Ref: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
 * @param enhancer
 */
function devtools(enhancer) {
    if (typeof window !== "undefined") {
        var extension = window.__REDUX_DEVTOOLS_EXTENSION__;
        if (extension) {
            return Object(redux["d" /* compose */])(enhancer, extension({}));
        }
    }
    return enhancer;
}
var createHistory = function (url) {
    if (url === void 0) { url = "/"; }
    return isServer
        ? Object(esm_history["c" /* createMemoryHistory */])({
            initialEntries: [url],
        })
        : Object(esm_history["a" /* createBrowserHistory */])();
};

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/react/index.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/react-redux/es/index.js + 22 modules
var es = __webpack_require__(17);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/react-dom/index.js
var react_dom = __webpack_require__(20);
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/react-loadable/lib/index.js
var lib = __webpack_require__(27);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/react-dom/server.browser.js
var server_browser = __webpack_require__(47);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/connected-react-router/esm/index.js + 5 modules
var esm = __webpack_require__(24);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/react-router/esm/react-router.js
var react_router = __webpack_require__(19);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/path-to-regexp/dist.es2015/index.js
var dist_es2015 = __webpack_require__(49);

// CONCATENATED MODULE: /Applications/project/own/reaux/packages/reaux-dom/src/core/start.tsx











/**
 * Start client react-dom render.
 * @param options
 * @param modules
 * @param app
 * @param history
 */
function clientStart(options, modules, app, history) {
    return Object(tslib_es6["b" /* __awaiter */])(this, void 0, void 0, function () {
        var routes, onError, onInitialized, isSSR, requiredRoutes, mainModuleName, afterBindAppModules, RouteComponent, WithRouterComponent, application, rootElement, renderCallback;
        return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    routes = options.routes, onError = options.onError, onInitialized = options.onInitialized, isSSR = options.isSSR;
                    requiredRoutes = getRequiredRoutes(routes, location.pathname);
                    return [4 /*yield*/, initModules(requiredRoutes, modules)];
                case 1:
                    mainModuleName = _a.sent();
                    afterBindAppModules = bindModulesWithApp(app, modules);
                    RouteComponent = createRouteComponent(routes, afterBindAppModules, modules, app);
                    WithRouterComponent = Object(react_router["g" /* withRouter */])(afterBindAppModules[mainModuleName].component);
                    application = (react_default.a.createElement(es["a" /* Provider */], { store: app.store },
                        react_default.a.createElement(reaux["b" /* ErrorBoundary */], { setErrorAction: reaux["k" /* setErrorAction */] },
                            react_default.a.createElement(esm["a" /* ConnectedRouter */], { history: history },
                                react_default.a.createElement(WithRouterComponent, { RouteComponent: RouteComponent })))));
                    if (typeof onError === "function") {
                        app.exceptionHandler.onError = onError.bind(app);
                    }
                    listenGlobalError(app);
                    rootElement = document.getElementById("reaux-app-root");
                    renderCallback = function () {
                        if (typeof onInitialized === "function") {
                            onInitialized();
                        }
                    };
                    if (isSSR) {
                        lib_default.a.preloadReady().then(function () {
                            react_dom_default.a.hydrate(application, rootElement, renderCallback);
                        });
                    }
                    else {
                        react_dom_default.a.render(application, rootElement, renderCallback);
                    }
                    return [2 /*return*/, null];
            }
        });
    });
}
/**
 * Start server react-dom render.
 * @param options
 * @param modules
 * @param app
 */
function serverStart(options, modules, app) {
    return Object(tslib_es6["b" /* __awaiter */])(this, void 0, void 0, function () {
        var routes, _a, url, mainModuleName, afterBindAppModules, RouteComponent, WithRouterComponent, modulesName, application, content, initialReduxState;
        return Object(tslib_es6["d" /* __generator */])(this, function (_b) {
            switch (_b.label) {
                case 0:
                    routes = options.routes, _a = options.url, url = _a === void 0 ? "/" : _a;
                    return [4 /*yield*/, initModules(routes, modules)];
                case 1:
                    mainModuleName = _b.sent();
                    afterBindAppModules = bindModulesWithApp(app, modules);
                    RouteComponent = createRouteComponent(routes, afterBindAppModules, modules);
                    WithRouterComponent = Object(react_router["g" /* withRouter */])(afterBindAppModules[mainModuleName].component);
                    modulesName = [mainModuleName];
                    application = (react_default.a.createElement(lib_default.a.Capture, { report: function (moduleName) { return modulesName.push(moduleName); } },
                        react_default.a.createElement(es["a" /* Provider */], { store: app.store },
                            react_default.a.createElement(reaux["b" /* ErrorBoundary */], { setErrorAction: reaux["k" /* setErrorAction */] },
                                react_default.a.createElement(react_router["d" /* StaticRouter */], { location: url, context: {} },
                                    react_default.a.createElement(WithRouterComponent, { RouteComponent: RouteComponent }))))));
                    content = Object(server_browser["renderToString"])(application);
                    initialReduxState = app.store.getState();
                    return [2 /*return*/, { content: content, reduxState: initialReduxState }];
            }
        });
    });
}
function initModules(routes, modules) {
    var _a;
    return Object(tslib_es6["b" /* __awaiter */])(this, void 0, void 0, function () {
        var mainModule, length, i;
        return Object(tslib_es6["d" /* __generator */])(this, function (_b) {
            switch (_b.label) {
                case 0:
                    mainModule = (_a = routes.find(function (_) { return !_.path; })) === null || _a === void 0 ? void 0 : _a.namespace;
                    if (!mainModule) {
                        throw new Error("Missing entry module");
                    }
                    length = Object.keys(modules).length;
                    if (!(length <= 0)) return [3 /*break*/, 3];
                    i = 0;
                    _b.label = 1;
                case 1:
                    if (!(i < routes.length)) return [3 /*break*/, 3];
                    return [4 /*yield*/, routes[i].module()];
                case 2:
                    _b.sent();
                    i++;
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/, mainModule];
            }
        });
    });
}
function getRequiredRoutes(routes, url) {
    var nextRoutes = routes.filter(function (_) { return _.path; });
    var pathRegexps = nextRoutes.map(function (_) { var _a; return Object(dist_es2015["a" /* pathToRegexp */])(_.path, [], Object(tslib_es6["a" /* __assign */])({ strict: !!(_ === null || _ === void 0 ? void 0 : _.exact) }, ((_a = _ === null || _ === void 0 ? void 0 : _.pathToRegexpOptions) !== null && _a !== void 0 ? _a : {}))); });
    var routeIndex = pathRegexps.findIndex(function (_) { return _.test(url); });
    return [routes.find(function (_) { return !_.path; }), nextRoutes === null || nextRoutes === void 0 ? void 0 : nextRoutes[routeIndex]].filter(function (_) { return _; });
}
function bindModulesWithApp(app, modules) {
    return Object.keys(modules).reduce(function (pre, key) {
        pre[key] = modules[key](app);
        return pre;
    }, {});
}
function createRouteComponent(routes, afterBindAppModules, modules, app) {
    var clientAfterBindAppModule = {};
    var keys = Object.keys(afterBindAppModules);
    var clientToBeLoadedRoutes = routes.reduce(function (pre, next) {
        if (!keys.includes(next.namespace)) {
            pre.push(next);
        }
        return pre;
    }, []);
    var render = function (namespace) {
        var _a;
        var module = (_a = routes.find(function (_) { return _.namespace === namespace; })) === null || _a === void 0 ? void 0 : _a.module;
        var Component = Object(reaux["a" /* Async */])(function () {
            if (!clientAfterBindAppModule[namespace]) {
                clientAfterBindAppModule[namespace] = module().then(function (_) {
                    if (app) {
                        modules[namespace](app);
                    }
                    return _;
                });
            }
            return clientAfterBindAppModule[namespace];
        });
        return function () { return react_default.a.createElement(Component, null); };
    };
    return function () { return (react_default.a.createElement(react_router["e" /* Switch */], null,
        routes.map(function (route) {
            var _a;
            var namespace = route.namespace, render = route.render, path = route.path, module = route.module, restProps = Object(tslib_es6["e" /* __rest */])(route, ["namespace", "render", "path", "module"]);
            var Component = (_a = afterBindAppModules === null || afterBindAppModules === void 0 ? void 0 : afterBindAppModules[namespace]) === null || _a === void 0 ? void 0 : _a.component;
            return path && Component && react_default.a.createElement(react_router["b" /* Route */], Object(tslib_es6["a" /* __assign */])({ key: namespace, path: path }, restProps, { render: function () { return react_default.a.createElement(Component, null); } }));
        }),
        !isServer && clientToBeLoadedRoutes.map(function (_) { return react_default.a.createElement(react_router["b" /* Route */], Object(tslib_es6["a" /* __assign */])({ key: _.namespace }, _, { render: render(_.namespace) })); }))); };
}

// CONCATENATED MODULE: /Applications/project/own/reaux/packages/reaux-dom/src/core/register.ts


/**
 * Register module create View and actions.
 * Trigger in every module.
 * @param paramApp
 */
function register(paramApp) {
    // @ts-ignore
    var that = this;
    paramApp.modules[that.handler.moduleName] = 0;
    that.handler._injectApp(paramApp);
    // register reducer
    var currentModuleReducer = Object(reaux["g" /* createModuleReducer */])(that.handler.moduleName);
    paramApp.asyncReducers[that.handler.moduleName] = currentModuleReducer;
    paramApp.store.replaceReducer(Object(reaux["h" /* createReducer */])(paramApp.asyncReducers));
    // initState can store on the client, but it will be lost on the server
    if (paramApp.isServer) {
        paramApp.store.dispatch({ type: Object(reaux["e" /* createActionType */])(that.handler.moduleName), payload: that.handler.initState });
    }
    // register actions
    var _a = Object(reaux["d" /* createAction */])(that.handler), actions = _a.actions, actionHandlers = _a.actionHandlers;
    paramApp.actionHandlers = Object(tslib_es6["a" /* __assign */])(Object(tslib_es6["a" /* __assign */])({}, paramApp.actionHandlers), actionHandlers);
    paramApp.actionPHandlers = Object(tslib_es6["a" /* __assign */])(Object(tslib_es6["a" /* __assign */])({}, paramApp.actionPHandlers), actionHandlers);
    paramApp.actionGHandlers = Object(tslib_es6["a" /* __assign */])(Object(tslib_es6["a" /* __assign */])({}, paramApp.actionGHandlers), actionHandlers);
    that.result.actions = actions;
    that.result.component = Object(reaux["i" /* createView */])(paramApp, that.handler, actions, that.component);
    return that.result;
}

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js + 1 modules
var redux_saga_effects_npm_proxy_esm = __webpack_require__(15);

// CONCATENATED MODULE: /Applications/project/own/reaux/packages/reaux-dom/src/core/helper.ts



// TODO:move to reaux
function handlerDecorator(interceptor) {
    return function (target, name, descriptor) {
        var handler = descriptor.value;
        // TODO: Detect whether it is promise or generator
        descriptor.value = function () {
            var _i, rootState;
            var args = [];
            for (_i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rootState = target.rootState;
                        return [5 /*yield**/, Object(tslib_es6["g" /* __values */])(interceptor(handler.bind.apply(handler, Object(tslib_es6["f" /* __spreadArrays */])([this], args)), rootState))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        };
        return descriptor;
    };
}
function genHelper() {
    var helper;
    return {
        injectApp: function (app) { return (helper = new helper_Helper(app)); },
        useHelper: function () { return helper; },
    };
}
var helper_Helper = /** @class */ (function () {
    function Helper(app) {
        this.appCache = app;
    }
    Helper.prototype.loading = function (identifier) {
        if (identifier === void 0) { identifier = "global"; }
        var that = this;
        return handlerDecorator(function (handler) {
            var nextLoadingState, nextLoadingState;
            return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, , 3, 5]);
                        nextLoadingState = that.appCache.store.getState()["@loading"];
                        nextLoadingState[identifier] = nextLoadingState[identifier] + 1 || 1;
                        return [4 /*yield*/, Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(Object(reaux["l" /* setModuleAction */])("@loading", nextLoadingState))];
                    case 1:
                        _a.sent();
                        return [5 /*yield**/, Object(tslib_es6["g" /* __values */])(handler())];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        nextLoadingState = that.appCache.store.getState()["@loading"];
                        nextLoadingState[identifier] = nextLoadingState[identifier] - 1 || 0;
                        return [4 /*yield*/, Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(Object(reaux["l" /* setModuleAction */])("@loading", nextLoadingState))];
                    case 4:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Helper.prototype.lifecycle = function () {
        return function (target, propertyKey, descriptor) {
            descriptor.value.isLifecycle = true;
            return descriptor;
        };
    };
    return Helper;
}());


// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js + 3 modules
var redux_saga_core_npm_proxy_esm = __webpack_require__(50);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/connected-react-router/esm/middleware.js
var middleware = __webpack_require__(40);

// CONCATENATED MODULE: /Applications/project/own/reaux/packages/reaux-dom/src/core/app.ts






/**
 * Create history, reducer, middleware, store, redux-saga, app cache
 * @param history
 */
function genApp(history) {
    var _a, _b;
    var asyncReducer = {};
    var preloadedState = (typeof window !== "undefined" && ((_b = (_a = window) === null || _a === void 0 ? void 0 : _a.__REAUX_DATA__) === null || _b === void 0 ? void 0 : _b.ReduxState)) || {};
    var sagaMiddleware = Object(redux_saga_core_npm_proxy_esm["a" /* default */])();
    var reduxMiddleware = [sagaMiddleware];
    if (!isServer) {
        var routerReducer = Object(esm["b" /* connectRouter */])(history);
        asyncReducer.router = routerReducer;
        var historyMiddleware = Object(middleware["a" /* default */])(history);
        reduxMiddleware.push(historyMiddleware);
    }
    var reducer = Object(reaux["h" /* createReducer */])(asyncReducer);
    var store = Object(redux["e" /* createStore */])(reducer, preloadedState, devtools(redux["a" /* applyMiddleware */].apply(void 0, reduxMiddleware)));
    var app = Object(reaux["f" /* createApp */])(store);
    app.asyncReducers = Object(tslib_es6["a" /* __assign */])(Object(tslib_es6["a" /* __assign */])({}, app.asyncReducers), asyncReducer);
    sagaMiddleware.run(reaux["j" /* saga */], app);
    // TODO:
    // pMiddleware.run(app);
    // gMiddleware.run(app);
    return app;
}

// CONCATENATED MODULE: /Applications/project/own/reaux/packages/reaux-dom/src/core/index.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return start; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return core_register; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return useHelper; });






var helperCreator = genHelper();
// TODO: move to genApp? cause lifecycle bug
var core_history = createHistory();
/**
 * modules cache, store pre-register when app started
 */
var core_modules = {};
/**
 * Start react-dom render.
 * Project entry, trigger once. e.g: main module.
 * @param options
 */
function start(options) {
    return Object(tslib_es6["b" /* __awaiter */])(this, void 0, void 0, function () {
        var app, _a;
        var _this = this;
        return Object(tslib_es6["d" /* __generator */])(this, function (_b) {
            switch (_b.label) {
                case 0:
                    app = genApp(core_history);
                    helperCreator.injectApp(app);
                    if (!isServer) return [3 /*break*/, 1];
                    _a = function (url) {
                        if (url === void 0) { url = "/"; }
                        return Object(tslib_es6["b" /* __awaiter */])(_this, void 0, void 0, function () { return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, serverStart(Object(tslib_es6["a" /* __assign */])(Object(tslib_es6["a" /* __assign */])({}, options), { url: url }), core_modules, app)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); });
                    };
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, clientStart(options, core_modules, app, core_history)];
                case 2:
                    _a = _b.sent();
                    _b.label = 3;
                case 3: return [2 /*return*/, _a];
            }
        });
    });
}
/**
 * Register module
 * @param handler
 * @param view
 */
function core_register(handler, component) {
    if (core_modules.hasOwnProperty(handler.moduleName)) {
        throw new Error("module is already registered, module=" + handler.moduleName);
    }
    var result = {};
    core_modules[handler.moduleName] = register.bind({ handler: handler, component: component, result: result });
    return function () { return result; };
}
var useHelper = function () { return helperCreator.useHelper(); };


/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__(2);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/react/index.js
var react = __webpack_require__(1);

// CONCATENATED MODULE: /Applications/project/own/reaux/packages/reaux/src/component/Async.tsx


function Async(resolve, loadingComponent) {
    if (loadingComponent === void 0) { loadingComponent = null; }
    return /** @class */ (function (_super) {
        Object(tslib_es6["c" /* __extends */])(AsyncWrapperComponent, _super);
        function AsyncWrapperComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {
                Component: null,
            };
            return _this;
        }
        AsyncWrapperComponent.prototype.componentDidMount = function () {
            var _this = this;
            var promise = resolve();
            promise.then(function (module) {
                var Component = module.default().component;
                _this.setState({ Component: Component });
            });
        };
        AsyncWrapperComponent.prototype.render = function () {
            var Component = this.state.Component;
            return Component ? react["createElement"](Component, Object(tslib_es6["a" /* __assign */])({}, this.props)) : loadingComponent;
        };
        return AsyncWrapperComponent;
    }(react["PureComponent"]));
}
/**
 * TODO: 使用React.lazy/React.Suspense替代，但是目前React.Suspense一样无法用于服务端数据获取的情况
 */

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/react-redux/es/index.js + 22 modules
var es = __webpack_require__(17);

// CONCATENATED MODULE: /Applications/project/own/reaux/packages/reaux/src/type.ts
var ModelProperty = /** @class */ (function () {
    function ModelProperty() {
    }
    return ModelProperty;
}());

var ModelLifeCycle = /** @class */ (function () {
    function ModelLifeCycle() {
    }
    return ModelLifeCycle;
}());

var Exception = /** @class */ (function () {
    function Exception(message) {
        this.message = message;
    }
    return Exception;
}());


// CONCATENATED MODULE: /Applications/project/own/reaux/packages/reaux/src/component/ErrorBoundary.tsx




var ErrorBoundary_ReactLifecycleException = /** @class */ (function (_super) {
    Object(tslib_es6["c" /* __extends */])(ReactLifecycleException, _super);
    function ReactLifecycleException(message, componentStack) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.componentStack = componentStack;
        return _this;
    }
    return ReactLifecycleException;
}(Exception));
var ErrorBoundary_Component = /** @class */ (function (_super) {
    Object(tslib_es6["c" /* __extends */])(Component, _super);
    function Component() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { exception: null };
        return _this;
    }
    Component.prototype.componentDidUpdate = function (prevProps) {
        // Support page recovery
        if (this.props.children !== prevProps.children) {
            this.setState({ exception: null });
        }
    };
    Component.prototype.componentDidCatch = function (error, errorInfo) {
        var _a = this.props, dispatch = _a.dispatch, setErrorAction = _a.setErrorAction;
        var exception = new ErrorBoundary_ReactLifecycleException(error.message, errorInfo.componentStack);
        dispatch(setErrorAction(exception));
        this.setState({ exception: exception });
    };
    Component.prototype.render = function () {
        return this.state.exception ? this.props.render(this.state.exception) : this.props.children;
    };
    Component.defaultProps = { render: function () { return null; } };
    return Component;
}(react["PureComponent"]));
var ErrorBoundary = Object(es["c" /* connect */])()(ErrorBoundary_Component);

// CONCATENATED MODULE: /Applications/project/own/reaux/packages/reaux/src/core/shared.ts
function createActionType(namespace) {
    return "@@framework/actionType/" + namespace;
}
function createActionHandlerType(moduleName, ActionHandlerType) {
    return "@@framework/actionsHandler(" + moduleName + "=>" + ActionHandlerType + ")";
}
function setModuleAction(namespace, state) {
    return {
        type: createActionType(namespace),
        payload: state,
    };
}

// CONCATENATED MODULE: /Applications/project/own/reaux/packages/reaux/src/core/createAction.ts

/**
 * According handler propertyNames generate actions and actionsHandler
 * @param handler Module reference. e.g: const handler = new Module("name",{})
 */
function createAction(handler) {
    var moduleName = handler.moduleName;
    var keys = getPrototypeOfExceptConstructor(handler);
    var actions = {};
    var actionHandlers = {};
    keys.forEach(function (actionType) {
        var method = handler[actionType];
        var qualifiedActionType = createActionHandlerType(moduleName, actionType);
        actions[actionType] = function () {
            var payload = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                payload[_i] = arguments[_i];
            }
            return ({ type: qualifiedActionType, payload: payload });
        };
        actionHandlers[qualifiedActionType] = method.bind(handler);
    });
    return { actions: actions, actionHandlers: actionHandlers };
}
function getPrototypeOfExceptConstructor(object) {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(object)).filter(function (key) { return key !== "constructor"; });
}

// CONCATENATED MODULE: /Applications/project/own/reaux/packages/reaux/src/core/createApp.ts
var isServer = !(typeof window !== "undefined" && window.document && window.document.createElement);
/**
 * App cache.
 * Create store, actionHandler, actionPHandlers(promise handler), actionGHandlers(generator handler), modulesName, exceptionHandler.
 * @param callback
 */
function createApp(store) {
    var _a;
    return {
        isServer: isServer,
        serverRenderedModules: (!isServer && ((_a = window === null || window === void 0 ? void 0 : window.__REAUX_DATA__) === null || _a === void 0 ? void 0 : _a.serverRenderedModules)) || [],
        store: store,
        actionPHandlers: {},
        actionGHandlers: {},
        // TODO: delete in v3.0
        actionHandlers: {},
        modules: {},
        exceptionHandler: {},
        asyncReducers: {},
        injectReducer: function (reducers) { return store.replaceReducer(reducers); },
    };
}

// CONCATENATED MODULE: /Applications/project/own/reaux/packages/reaux/src/core/createModel.ts



/**
 * Proxy store
 */
var createModel_Model = /** @class */ (function (_super) {
    Object(tslib_es6["c" /* __extends */])(Model, _super);
    function Model(moduleName, initState) {
        var _this = _super.call(this) || this;
        _this.moduleName = moduleName;
        _this.initState = initState;
        _this.app = null;
        return _this;
    }
    // LifeCycle onReady/onLoad/onUnload/onHide
    Model.prototype.onReady = function () {
        // extends to be overrode
    };
    Model.prototype.onLoad = function (didMount) {
        // extends to be overrode
    };
    Model.prototype.onUnload = function () {
        // extends to be overrode
    };
    Model.prototype.onHide = function () {
        // extends to be overrode
    };
    Object.defineProperty(Model.prototype, "state", {
        get: function () {
            return this.app.store.getState()[this.moduleName];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "initialState", {
        get: function () {
            return this.initState;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "rootState", {
        get: function () {
            return this.app.store.getState();
        },
        enumerable: false,
        configurable: true
    });
    Model.prototype.setState = function (newState) {
        this.app.store.dispatch(setModuleAction(this.moduleName, newState));
    };
    Model.prototype.restState = function () {
        this.app.store.dispatch(setModuleAction(this.moduleName, this.initState));
    };
    Model.prototype._injectApp = function (app) {
        this.app = app;
        this.app.store.dispatch(setModuleAction(this.moduleName, this.initState));
    };
    return Model;
}(ModelProperty));


// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/redux/es/redux.js
var redux = __webpack_require__(13);

// CONCATENATED MODULE: /Applications/project/own/reaux/packages/reaux/src/core/createReducer.ts



function createModuleReducer(namespace) {
    return function (state, action) {
        if (state === void 0) { state = {}; }
        var actionType = createActionType(namespace);
        switch (action.type) {
            case actionType:
                var nextState = Object(tslib_es6["a" /* __assign */])(Object(tslib_es6["a" /* __assign */])({}, state), action.payload);
                return nextState;
            default:
                return state;
        }
    };
}
function createReducer(asyncReducers) {
    var reducers = Object(tslib_es6["a" /* __assign */])({ "@error": createModuleReducer("@error"), "@loading": createModuleReducer("@loading") }, asyncReducers);
    return Object(redux["c" /* combineReducers */])(reducers);
}

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js + 1 modules
var redux_saga_effects_npm_proxy_esm = __webpack_require__(15);

// CONCATENATED MODULE: /Applications/project/own/reaux/packages/reaux/src/core/saga.ts


var ERROR_ACTION_TYPE = "@@framework/error";
function setErrorAction(error) {
    return {
        type: ERROR_ACTION_TYPE,
        payload: error,
    };
}
function saga(app) {
    return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // Register saga, listener all actions
            return [4 /*yield*/, Object(redux_saga_effects_npm_proxy_esm["c" /* takeEvery */])("*", function (action) {
                    var actionHandlers, exceptionHandler, handler;
                    return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                actionHandlers = app.actionHandlers, exceptionHandler = app.exceptionHandler;
                                if (!(action.type === ERROR_ACTION_TYPE)) return [3 /*break*/, 4];
                                if (!exceptionHandler.onError) return [3 /*break*/, 2];
                                return [5 /*yield**/, Object(tslib_es6["g" /* __values */])(exceptionHandler.onError(action.payload))];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                console.error("Errors occurred, no bugs were monitored");
                                _a.label = 3;
                            case 3: return [3 /*break*/, 6];
                            case 4:
                                handler = actionHandlers[action.type];
                                if (!handler) return [3 /*break*/, 6];
                                return [4 /*yield*/, Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(run, handler, action.payload)];
                            case 5:
                                _a.sent();
                                _a.label = 6;
                            case 6: return [2 /*return*/];
                        }
                    });
                })];
            case 1:
                // Register saga, listener all actions
                _a.sent();
                return [2 /*return*/];
        }
    });
}
/* 执行 actionHandler (执行函数) */
function run(handler, payload) {
    var error_1;
    return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 4]);
                return [5 /*yield**/, Object(tslib_es6["g" /* __values */])(handler.apply(void 0, payload))];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2:
                error_1 = _a.sent();
                // 监听 actionHandler 发起的 error
                console.error("Redux Saga Run Error");
                console.error(error_1);
                return [4 /*yield*/, Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(setErrorAction(error_1))];
            case 3:
                _a.sent(); // 调用 takeEvery action.type === ERROR_ACTION_TYPE
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}

// CONCATENATED MODULE: /Applications/project/own/reaux/packages/reaux/src/core/createView.tsx


/**
 * Create Component and proxy component lifecycle
 * @param handler
 * @param actions
 * @param Comp
 */
function createView(app, handler, actions, Comp) {
    var _a;
    return _a = /** @class */ (function (_super) {
            Object(tslib_es6["c" /* __extends */])(View, _super);
            function View(props) {
                var _this = _super.call(this, props) || this;
                _this.onReady();
                return _this;
            }
            View.prototype.onReady = function () {
                if ("onReady" in actions && handler.onReady.isLifecycle) {
                    app.store.dispatch(actions.onReady());
                }
            };
            View.prototype.componentDidMount = function () {
                if ("onLoad" in actions && handler.onLoad.isLifecycle) {
                    app.store.dispatch(actions.onLoad(true));
                }
            };
            View.prototype.componentDidUpdate = function () {
                if ("onLoad" in actions && handler.onLoad.isLifecycle) {
                    app.store.dispatch(actions.onLoad(false));
                }
            };
            View.prototype.componentWillUnmount = function () {
                if ("onUnload" in actions && handler.onUnload.isLifecycle) {
                    app.store.dispatch(actions.onUnload());
                }
            };
            View.prototype.render = function () {
                return react["createElement"](Comp, Object(tslib_es6["a" /* __assign */])({}, this.props));
            };
            return View;
        }(react["PureComponent"])),
        _a.moduleName = handler.moduleName,
        _a;
}

// CONCATENATED MODULE: /Applications/project/own/reaux/packages/reaux/src/core/reduxMiddleware.tsx

var appCache;
function createPromiseMiddleware() {
    var _this = this;
    var middleware = function (api) { return function (next) { return function (actions) { return Object(tslib_es6["b" /* __awaiter */])(_this, void 0, void 0, function () {
        return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    next(actions);
                    if (!appCache || !appCache.actionPHandlers) {
                        throw new Error("Invoking action before execute promise middleware.run function only!!");
                    }
                    if (!appCache.actionPHandlers[actions.type]) return [3 /*break*/, 2];
                    // TODO: Unified runtime error handling
                    return [4 /*yield*/, appCache.actionPHandlers[actions.type](actions.payload)];
                case 1:
                    // TODO: Unified runtime error handling
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); }; }; };
    middleware.run = function (app) {
        appCache = app;
    };
    return middleware;
}
function createGeneratorMiddleware() {
    var middleware = function (api) { return function (next) { return function (actions) {
        next(actions);
        if (!appCache || !appCache.actionGHandlers) {
            throw new Error("Invoking action before execute generator middleware.run function only!!");
        }
        if (appCache.actionGHandlers[actions.type]) {
            var g = appCache.actionGHandlers[actions.type](actions.payload);
            var isDone = false;
            while (!isDone) {
                isDone = g.next().done;
            }
        }
    }; }; };
    middleware.run = function (app) {
        appCache = app;
    };
    return middleware;
}
var take = function () {
    return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
};
var put = function () {
    return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
};
var call = function () {
    return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
};
var folk = function () {
    return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
};
var spawn = function () {
    return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
};
// TODO:generator effect
var effects = {
    take: take,
    put: put,
    call: call,
    folk: folk,
    spawn: spawn,
};
var pMiddleware = createPromiseMiddleware();
var gMiddleware = createGeneratorMiddleware();
// Reference: https://github.com/pburtchaell/redux-promise-middleware
// Reference: https://github.com/redux-saga/redux-saga


// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/axios/index.js
var axios = __webpack_require__(46);
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);

// CONCATENATED MODULE: /Applications/project/own/reaux/packages/reaux/src/core/axios.ts

function ajax(method, path, pathParams, request) {
    var config = { method: method, url: url(path, pathParams) };
    if (method === "GET" || method === "DELETE") {
        config.params = request;
    }
    else if (method === "POST" || method === "PUT" || method === "PATCH") {
        config.data = request;
    }
    return axios_default.a.request(config).then(function (response) { return response.data; });
}
function url(pattern, params) {
    if (!params) {
        return pattern;
    }
    var url = pattern;
    Object.entries(params).forEach(function (_a) {
        var name = _a[0], value = _a[1];
        var encodedValue = encodeURIComponent(value.toString());
        url = url.replace(":" + name, encodedValue);
    });
    return url;
}

// CONCATENATED MODULE: /Applications/project/own/reaux/packages/reaux/src/core/exception.ts


// 请求返回错误 e.g: 3**/4**/5**
var exception_APIException = /** @class */ (function (_super) {
    Object(tslib_es6["c" /* __extends */])(APIException, _super);
    function APIException(message, statusCode, requestURL, responseData) {
        var _this = _super.call(this, message) || this;
        _this.statusCode = statusCode;
        _this.requestURL = requestURL;
        _this.responseData = responseData;
        return _this;
    }
    return APIException;
}(Exception));

// action error
var exception_RuntimeException = /** @class */ (function (_super) {
    Object(tslib_es6["c" /* __extends */])(RuntimeException, _super);
    function RuntimeException(message, error) {
        if (error === void 0) { error = null; }
        var _this = _super.call(this, message) || this;
        _this.error = error;
        return _this;
    }
    return RuntimeException;
}(Exception));

// ErrorBoundary
var exception_ReactLifecycleException = /** @class */ (function (_super) {
    Object(tslib_es6["c" /* __extends */])(ReactLifecycleException, _super);
    function ReactLifecycleException(message, componentStack) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.componentStack = componentStack;
        return _this;
    }
    return ReactLifecycleException;
}(Exception));

// 请求超时
var exception_NetworkConnectionException = /** @class */ (function (_super) {
    Object(tslib_es6["c" /* __extends */])(NetworkConnectionException, _super);
    function NetworkConnectionException(requestURL) {
        return _super.call(this, "failed to connect to " + requestURL) || this;
    }
    return NetworkConnectionException;
}(Exception));


// CONCATENATED MODULE: /Applications/project/own/reaux/packages/reaux/index.ts
/* concated harmony reexport Async */__webpack_require__.d(__webpack_exports__, "a", function() { return Async; });
/* concated harmony reexport ErrorBoundary */__webpack_require__.d(__webpack_exports__, "b", function() { return ErrorBoundary; });
/* concated harmony reexport createAction */__webpack_require__.d(__webpack_exports__, "d", function() { return createAction; });
/* concated harmony reexport createApp */__webpack_require__.d(__webpack_exports__, "f", function() { return createApp; });
/* concated harmony reexport Model */__webpack_require__.d(__webpack_exports__, "c", function() { return createModel_Model; });
/* concated harmony reexport createModuleReducer */__webpack_require__.d(__webpack_exports__, "g", function() { return createModuleReducer; });
/* concated harmony reexport createReducer */__webpack_require__.d(__webpack_exports__, "h", function() { return createReducer; });
/* concated harmony reexport setErrorAction */__webpack_require__.d(__webpack_exports__, "k", function() { return setErrorAction; });
/* concated harmony reexport saga */__webpack_require__.d(__webpack_exports__, "j", function() { return saga; });
/* concated harmony reexport createView */__webpack_require__.d(__webpack_exports__, "i", function() { return createView; });
/* unused concated harmony import createPromiseMiddleware */
/* unused concated harmony import createGeneratorMiddleware */
/* unused concated harmony import pMiddleware */
/* unused concated harmony import gMiddleware */
/* unused concated harmony import effects */
/* concated harmony reexport createActionType */__webpack_require__.d(__webpack_exports__, "e", function() { return createActionType; });
/* unused concated harmony import createActionHandlerType */
/* concated harmony reexport setModuleAction */__webpack_require__.d(__webpack_exports__, "l", function() { return setModuleAction; });
/* unused concated harmony import ModelProperty */
/* unused concated harmony import ModelLifeCycle */
/* unused concated harmony import Exception */
/* unused concated harmony import ajax */
/* unused concated harmony import url */
/* unused concated harmony import APIException */
/* unused concated harmony import RuntimeException */
/* unused concated harmony import ReactLifecycleException */
/* unused concated harmony import NetworkConnectionException */















/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: /Applications/project/own/reaux/packages/reaux-dom/index.ts
var reaux_dom = __webpack_require__(30);

// CONCATENATED MODULE: ./src/route.ts
/* harmony default export */ var route = ([
    {
        namespace: "main",
        module: function () { return __webpack_require__.e(/* import() | entry-module */ 1).then(__webpack_require__.bind(null, 81)); },
    },
    {
        namespace: "about",
        path: "/about",
        module: function () { return __webpack_require__.e(/* import() | about */ 0).then(__webpack_require__.bind(null, 82)); },
    },
    {
        namespace: "home",
        path: "/home",
        module: function () { return __webpack_require__.e(/* import() | home */ 2).then(__webpack_require__.bind(null, 83)); },
    },
]);

// CONCATENATED MODULE: ./src/index.ts


/* harmony default export */ var src = __webpack_exports__["default"] = (Object(reaux_dom["start"])({ routes: route, isSSR: true }));


/***/ })

},[[79,4,5]]]);