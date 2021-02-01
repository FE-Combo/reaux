(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(47);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GModel", function() { return _src_core__WEBPACK_IMPORTED_MODULE_0__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PModel", function() { return _src_core__WEBPACK_IMPORTED_MODULE_0__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "helper", function() { return _src_core__WEBPACK_IMPORTED_MODULE_0__["c"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "register", function() { return _src_core__WEBPACK_IMPORTED_MODULE_0__["d"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "start", function() { return _src_core__WEBPACK_IMPORTED_MODULE_0__["e"]; });

/* harmony import */ var _src_Route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(44);
/* harmony import */ var _src_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(27);
/* harmony import */ var _src_sagaCall__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(45);
/* harmony import */ var _src_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(46);
/* harmony import */ var _src_type__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_src_type__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var reaux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);








/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Helper; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var reaux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);



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
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __generator */ "d"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rootState = target.rootState;
                        return [5 /*yield**/, Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __values */ "g"])(interceptor(handler.bind.apply(handler, Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __spreadArrays */ "f"])([this], args)), rootState))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        };
        return descriptor;
    };
}
var Helper = /** @class */ (function () {
    function Helper(app) {
        this.appCache = app;
    }
    Helper.prototype.loading = function (identifier) {
        if (identifier === void 0) { identifier = "global"; }
        var that = this;
        return handlerDecorator(function (handler) {
            var nextLoadingState, nextLoadingState;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __generator */ "d"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, , 3, 5]);
                        nextLoadingState = that.appCache.store.getState()["@loading"];
                        nextLoadingState[identifier] = nextLoadingState[identifier] + 1 || 1;
                        return [4 /*yield*/, Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__[/* put */ "b"])(Object(reaux__WEBPACK_IMPORTED_MODULE_2__[/* setModuleAction */ "n"])("@loading", nextLoadingState))];
                    case 1:
                        _a.sent();
                        return [5 /*yield**/, Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __values */ "g"])(handler())];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        nextLoadingState = that.appCache.store.getState()["@loading"];
                        nextLoadingState[identifier] = nextLoadingState[identifier] - 1 || 0;
                        return [4 /*yield*/, Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__[/* put */ "b"])(Object(reaux__WEBPACK_IMPORTED_MODULE_2__[/* setModuleAction */ "n"])("@loading", nextLoadingState))];
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



/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Route */
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var reaux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);




var Route = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "c"])(Route, _super);
    function Route() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Route.prototype.render = function () {
        var _a = this.props, component = _a.component, withErrorBoundary = _a.withErrorBoundary, accessCondition = _a.accessCondition, unauthorizedRedirectTo = _a.unauthorizedRedirectTo, restProps = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __rest */ "e"])(_a, ["component", "withErrorBoundary", "accessCondition", "unauthorizedRedirectTo"]);
        var TargetComponent = component;
        var routeNode = (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__[/* Route */ "b"], Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, restProps, { render: function (props) {
                return accessCondition ? react__WEBPACK_IMPORTED_MODULE_1__["createElement"](TargetComponent, Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({}, props)) : react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__[/* Redirect */ "a"], { to: { pathname: unauthorizedRedirectTo } });
            } })));
        return withErrorBoundary ? react__WEBPACK_IMPORTED_MODULE_1__["createElement"](reaux__WEBPACK_IMPORTED_MODULE_3__[/* ErrorBoundary */ "a"], { setErrorAction: reaux__WEBPACK_IMPORTED_MODULE_3__[/* setErrorAction */ "m"] }, routeNode) : routeNode;
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

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export call */
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);


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

/***/ 46:
/***/ (function(module, exports) {



/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__(2);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/react/index.js
var react = __webpack_require__(1);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/react-dom/index.js
var react_dom = __webpack_require__(23);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/react-loadable/lib/index.js
var lib = __webpack_require__(21);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/react-dom/server.browser.js
var server_browser = __webpack_require__(50);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/react-router/esm/react-router.js + 1 modules
var react_router = __webpack_require__(22);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/redux/es/redux.js
var redux = __webpack_require__(12);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/react-redux/es/index.js + 22 modules
var es = __webpack_require__(14);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/connected-react-router/esm/index.js + 5 modules
var esm = __webpack_require__(32);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/connected-react-router/esm/middleware.js
var middleware = __webpack_require__(43);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/connected-react-router/esm/actions.js
var esm_actions = __webpack_require__(8);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js + 3 modules
var redux_saga_core_npm_proxy_esm = __webpack_require__(52);

// EXTERNAL MODULE: /Applications/project/own/reaux/packages/reaux/index.ts + 14 modules
var reaux = __webpack_require__(7);

// EXTERNAL MODULE: /Applications/project/own/reaux/packages/reaux-dom/src/helper.ts
var helper = __webpack_require__(27);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/history/esm/history.js + 2 modules
var esm_history = __webpack_require__(11);

// CONCATENATED MODULE: /Applications/project/own/reaux/packages/reaux-dom/src/routerHistory.ts

var isServer = !(typeof window !== "undefined" && window.document && window.document.createElement);
var createHistory = function (url) {
    if (url === void 0) { url = "/"; }
    return isServer
        ? Object(esm_history["c" /* createMemoryHistory */])({
            initialEntries: [url],
        })
        : Object(esm_history["a" /* createBrowserHistory */])();
};
/* harmony default export */ var routerHistory = (createHistory);

// CONCATENATED MODULE: /Applications/project/own/reaux/packages/reaux-dom/src/core.tsx
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return core_helper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return start; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return register; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return core_GModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return core_PModel; });













var core_history = routerHistory();
var core_app = generateApp();
Object(reaux["k" /* modelInjection */])(core_app);
Object(reaux["o" /* viewInjection */])(core_app);
var core_helper = new helper["a" /* Helper */](core_app);
/**
 * Create history, reducer, middleware, store, redux-saga, app cache
 */
function generateApp() {
    var _a, _b;
    var routerReducer = Object(esm["b" /* connectRouter */])(core_history);
    var asyncReducer = { router: routerReducer };
    var historyMiddleware = Object(middleware["a" /* default */])(core_history);
    var sagaMiddleware = Object(redux_saga_core_npm_proxy_esm["a" /* default */])();
    var reducer = Object(reaux["h" /* createReducer */])(asyncReducer);
    var preloadedState = (typeof window !== "undefined" && ((_b = (_a = window) === null || _a === void 0 ? void 0 : _a.__REAUX_DATA__) === null || _b === void 0 ? void 0 : _b.ReduxState)) || {};
    var store = Object(redux["e" /* createStore */])(reducer, preloadedState, devtools(Object(redux["a" /* applyMiddleware */])(historyMiddleware, reaux["j" /* dynamicMiddleware */])));
    var app = Object(reaux["f" /* createApp */])(store);
    app.asyncReducers = Object(tslib_es6["a" /* __assign */])(Object(tslib_es6["a" /* __assign */])({}, app.asyncReducers), asyncReducer);
    Object(reaux["c" /* addMiddleware */])(sagaMiddleware);
    sagaMiddleware.run(reaux["l" /* saga */], app);
    // TODO:
    // pMiddleware.run(app);
    // gMiddleware.run(app);
    app.compileConfig =  true ? Object({"isSSR":true}) : undefined;
    app.runtimeConfig = typeof REAUX_RUNTIME_CONFIG === "object" ? REAUX_RUNTIME_CONFIG : {};
    return app;
}
/**
 * Start client react-dom render.
 * Project entry, trigger once. e.g: main module.
 * @param options
 */
function start(options) {
    var _a;
    var Component = options.Component, onError = options.onError, onInitialized = options.onInitialized, _b = options.url, url = _b === void 0 ? "/" : _b;
    var WithRouterComponent = Object(react_router["g" /* withRouter */])(Component);
    var Application = function () { return (react["createElement"](es["a" /* Provider */], { store: core_app.store },
        react["createElement"](reaux["a" /* ErrorBoundary */], { setErrorAction: reaux["m" /* setErrorAction */] }, core_app.isServer ? (react["createElement"](react_router["d" /* StaticRouter */], { location: url, context: {} },
            react["createElement"](WithRouterComponent, null))) : (react["createElement"](esm["a" /* ConnectedRouter */], { history: core_history },
            react["createElement"](WithRouterComponent, null)))))); };
    if (core_app.isServer) {
        var mainModuleName = Component.moduleName;
        if (!core_app.serverRenderedModules.includes(mainModuleName)) {
            core_app.serverRenderedModules.push(mainModuleName);
        }
        var content = Object(server_browser["renderToString"])(react["createElement"](Application, null));
        var reduxState = core_app.store.getState();
        reduxState.router.location.pathname = url;
        return { content: content, serverRenderedModules: core_app.serverRenderedModules, reduxState: reduxState };
    }
    else {
        if (typeof onError === "function") {
            core_app.exceptionHandler.onError = onError.bind(core_app);
        }
        listenGlobalError();
        var rootElement_1 = document.getElementById("reaux-app-root");
        var renderCallback_1 = function () {
            if (typeof onInitialized === "function") {
                onInitialized();
            }
        };
        if ((_a = core_app.compileConfig) === null || _a === void 0 ? void 0 : _a.isSSR) {
            lib["preloadReady"]().then(function () {
                react_dom["hydrate"](react["createElement"](Application, null), rootElement_1, renderCallback_1);
            });
        }
        else {
            react_dom["render"](react["createElement"](Application, null), rootElement_1, renderCallback_1);
        }
    }
    return;
}
/**
 * Register module create View and actions.
 * Trigger in every module.
 * @param handler
 * @param view
 */
function register(handler) {
    if (core_app.modules.hasOwnProperty(handler.moduleName)) {
        throw new Error("module is already registered, module=" + handler.moduleName);
    }
    core_app.modules[handler.moduleName] = 0;
    // register reducer
    var currentModuleReducer = Object(reaux["g" /* createModuleReducer */])(handler.moduleName);
    core_app.asyncReducers[handler.moduleName] = currentModuleReducer;
    core_app.store.replaceReducer(Object(reaux["h" /* createReducer */])(core_app.asyncReducers));
    // initState can store on the client, but it will be lost on the server
    if (core_app.isServer) {
        core_app.store.dispatch({ type: Object(reaux["e" /* createActionType */])(handler.moduleName), payload: handler.initState });
    }
    // register actions
    var _a = Object(reaux["d" /* createAction */])(handler), actions = _a.actions, actionHandlers = _a.actionHandlers;
    core_app.actionHandlers = Object(tslib_es6["a" /* __assign */])(Object(tslib_es6["a" /* __assign */])({}, core_app.actionHandlers), actionHandlers);
    core_app.actionPHandlers = Object(tslib_es6["a" /* __assign */])(Object(tslib_es6["a" /* __assign */])({}, core_app.actionPHandlers), actionHandlers);
    core_app.actionGHandlers = Object(tslib_es6["a" /* __assign */])(Object(tslib_es6["a" /* __assign */])({}, core_app.actionGHandlers), actionHandlers);
    return {
        actions: actions,
        proxyView: function (View) {
            // register view
            var NextView = Object(reaux["i" /* createView */])(handler, actions, View);
            return NextView;
        },
    };
}
/**
 * Module extends Generator Model
 */
var core_GModel = /** @class */ (function (_super) {
    Object(tslib_es6["c" /* __extends */])(GModel, _super);
    function GModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GModel.prototype.setHistory = function (newURL) {
        core_app.store.dispatch(Object(esm_actions["d" /* push */])(newURL));
    };
    return GModel;
}(reaux["b" /* Model */]));

/**
 * Module extends Promise Model
 */
var core_PModel = /** @class */ (function (_super) {
    Object(tslib_es6["c" /* __extends */])(PModel, _super);
    function PModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PModel.prototype.setHistory = function (newURL) {
        core_app.store.dispatch(Object(esm_actions["d" /* push */])(newURL));
    };
    return PModel;
}(reaux["b" /* Model */]));

/**
 * Listen global error
 */
function listenGlobalError() {
    if (typeof window !== "undefined") {
        window.onerror = function (message, source, line, column, error) {
            console.error("Window Global Error");
            if (!error) {
                error = new Error(message.toString());
            }
            core_app.store.dispatch(Object(reaux["m" /* setErrorAction */])(error));
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


/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__(2);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/react/index.js
var react = __webpack_require__(1);

// CONCATENATED MODULE: /Applications/project/own/reaux/packages/reaux/src/component/Async.tsx


function Async(resolve, component, loadingComponent) {
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
                var Component = module[component];
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
 * TODO: 使用React.lazy/React.Suspense替代，但是目前React.Suspense无法用于数据获取的情况
 */

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/react-redux/es/index.js + 22 modules
var es = __webpack_require__(14);

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



var appCache = null;
function modelInjection(app) {
    appCache = app;
}
/**
 * Proxy store
 */
var createModel_Model = /** @class */ (function (_super) {
    Object(tslib_es6["c" /* __extends */])(Model, _super);
    function Model(moduleName, initState) {
        var _this = _super.call(this) || this;
        _this.moduleName = moduleName;
        _this.initState = initState;
        if (!appCache) {
            throw new Error("Execute the injection function before using Model only!!");
        }
        console.log("model");
        if (appCache.isServer) {
            appCache.store.dispatch(setModuleAction(moduleName, initState));
        }
        else {
            var moduleNameIndex = appCache.serverRenderedModules.indexOf(moduleName);
            if (moduleNameIndex === -1) {
                appCache.store.dispatch(setModuleAction(moduleName, initState));
            }
        }
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
            return appCache.store.getState()[this.moduleName];
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
            return appCache.store.getState();
        },
        enumerable: false,
        configurable: true
    });
    Model.prototype.setState = function (newState) {
        appCache.store.dispatch(setModuleAction(this.moduleName, newState));
    };
    Model.prototype.restState = function () {
        appCache.store.dispatch(setModuleAction(this.moduleName, this.initState));
    };
    return Model;
}(ModelProperty));


// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/redux/es/redux.js
var redux = __webpack_require__(12);

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
var redux_saga_effects_npm_proxy_esm = __webpack_require__(16);

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


var createView_appCache = null;
function viewInjection(app) {
    createView_appCache = app;
}
/**
 * Create Component and proxy component lifecycle
 * @param handler
 * @param actions
 * @param Component
 */
function createView(handler, actions, Component) {
    var _a;
    return _a = /** @class */ (function (_super) {
            Object(tslib_es6["c" /* __extends */])(View, _super);
            function View(props) {
                var _this = _super.call(this, props) || this;
                if (!createView_appCache) {
                    throw new Error("Execute the injection function before using View only!!");
                }
                console.log("view");
                if (createView_appCache.isServer) {
                    _this.onReady();
                    if (!createView_appCache.serverRenderedModules.includes(handler.moduleName)) {
                        createView_appCache.serverRenderedModules.push(handler.moduleName);
                    }
                }
                else {
                    var moduleNameIndex = createView_appCache.serverRenderedModules.indexOf(handler.moduleName);
                    if (moduleNameIndex === -1) {
                        _this.onReady();
                    }
                    else {
                        createView_appCache.serverRenderedModules.splice(moduleNameIndex, 1);
                    }
                }
                return _this;
            }
            View.prototype.onReady = function () {
                if ("onReady" in actions && handler.onReady.isLifecycle) {
                    createView_appCache.store.dispatch(actions.onReady());
                }
            };
            View.prototype.componentDidMount = function () {
                this.setState({ isReady: true });
                if ("onLoad" in actions && handler.onLoad.isLifecycle) {
                    createView_appCache.store.dispatch(actions.onLoad(true));
                }
            };
            View.prototype.componentDidUpdate = function () {
                if ("onLoad" in actions && handler.onLoad.isLifecycle) {
                    createView_appCache.store.dispatch(actions.onLoad(false));
                }
            };
            View.prototype.componentWillUnmount = function () {
                if ("onUnload" in actions && handler.onUnload.isLifecycle) {
                    createView_appCache.store.dispatch(actions.onUnload());
                }
            };
            View.prototype.render = function () {
                return react["createElement"](Component, Object(tslib_es6["a" /* __assign */])({}, this.props));
            };
            return View;
        }(react["PureComponent"])),
        _a.moduleName = handler.moduleName,
        _a;
}

// CONCATENATED MODULE: /Applications/project/own/reaux/packages/reaux/src/core/reduxMiddleware.tsx

var reduxMiddleware_appCache;
function createPromiseMiddleware() {
    var _this = this;
    var middleware = function (api) { return function (next) { return function (actions) { return Object(tslib_es6["b" /* __awaiter */])(_this, void 0, void 0, function () {
        return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    next(actions);
                    if (!reduxMiddleware_appCache || !reduxMiddleware_appCache.actionPHandlers) {
                        throw new Error("Invoking action before execute promise middleware.run function only!!");
                    }
                    if (!reduxMiddleware_appCache.actionPHandlers[actions.type]) return [3 /*break*/, 2];
                    // TODO: Unified runtime error handling
                    return [4 /*yield*/, reduxMiddleware_appCache.actionPHandlers[actions.type](actions.payload)];
                case 1:
                    // TODO: Unified runtime error handling
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); }; }; };
    middleware.run = function (app) {
        reduxMiddleware_appCache = app;
    };
    return middleware;
}
function createGeneratorMiddleware() {
    var middleware = function (api) { return function (next) { return function (actions) {
        next(actions);
        if (!reduxMiddleware_appCache || !reduxMiddleware_appCache.actionGHandlers) {
            throw new Error("Invoking action before execute generator middleware.run function only!!");
        }
        if (reduxMiddleware_appCache.actionGHandlers[actions.type]) {
            var g = reduxMiddleware_appCache.actionGHandlers[actions.type](actions.payload);
            var isDone = false;
            while (!isDone) {
                isDone = g.next().done;
            }
        }
    }; }; };
    middleware.run = function (app) {
        reduxMiddleware_appCache = app;
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
var axios = __webpack_require__(51);
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


// CONCATENATED MODULE: /Applications/project/own/reaux/packages/reaux/src/core/dynamicMiddleware.tsx

// TODO: remove any
var createDynamicMiddleware = function () {
    var allDynamicMiddleware = [];
    var allAppliedDynamicMiddleware = [];
    var store;
    var enhancer = function (_store) {
        store = _store;
        return function (next) { return function (action) {
            return redux["d" /* compose */].apply(void 0, allAppliedDynamicMiddleware)(next)(action);
        }; };
    };
    var addMiddleware = function () {
        var middleware = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            middleware[_i] = arguments[_i];
        }
        allAppliedDynamicMiddleware.push.apply(allAppliedDynamicMiddleware, middleware.map(function (middleware) { return middleware(store); }));
        allDynamicMiddleware.push.apply(allDynamicMiddleware, middleware);
    };
    var removeMiddleware = function (middleware) {
        var index = allDynamicMiddleware.findIndex(function (d) { return d === middleware; });
        if (index === -1) {
            // eslint-disable-next-line no-console
            console.error("Middleware does not exist!", middleware);
            return;
        }
        allDynamicMiddleware = allDynamicMiddleware.filter(function (_, mdwIndex) { return mdwIndex !== index; });
        allAppliedDynamicMiddleware = allAppliedDynamicMiddleware.filter(function (_, mdwIndex) { return mdwIndex !== index; });
    };
    var resetMiddleware = function () {
        allAppliedDynamicMiddleware = [];
        allDynamicMiddleware = [];
    };
    return {
        enhancer: enhancer,
        addMiddleware: addMiddleware,
        removeMiddleware: removeMiddleware,
        resetMiddleware: resetMiddleware,
    };
};
var dynamicMiddlewareInstance = createDynamicMiddleware();
var dynamicMiddleware = dynamicMiddlewareInstance.enhancer;
var dynamicMiddleware_addMiddleware = dynamicMiddlewareInstance.addMiddleware, dynamicMiddleware_removeMiddleware = dynamicMiddlewareInstance.removeMiddleware, dynamicMiddleware_resetMiddleware = dynamicMiddlewareInstance.resetMiddleware;


// CONCATENATED MODULE: /Applications/project/own/reaux/packages/reaux/index.ts
/* unused concated harmony import Async */
/* concated harmony reexport ErrorBoundary */__webpack_require__.d(__webpack_exports__, "a", function() { return ErrorBoundary; });
/* concated harmony reexport createAction */__webpack_require__.d(__webpack_exports__, "d", function() { return createAction; });
/* concated harmony reexport createApp */__webpack_require__.d(__webpack_exports__, "f", function() { return createApp; });
/* concated harmony reexport modelInjection */__webpack_require__.d(__webpack_exports__, "k", function() { return modelInjection; });
/* concated harmony reexport Model */__webpack_require__.d(__webpack_exports__, "b", function() { return createModel_Model; });
/* concated harmony reexport createModuleReducer */__webpack_require__.d(__webpack_exports__, "g", function() { return createModuleReducer; });
/* concated harmony reexport createReducer */__webpack_require__.d(__webpack_exports__, "h", function() { return createReducer; });
/* concated harmony reexport setErrorAction */__webpack_require__.d(__webpack_exports__, "m", function() { return setErrorAction; });
/* concated harmony reexport saga */__webpack_require__.d(__webpack_exports__, "l", function() { return saga; });
/* concated harmony reexport viewInjection */__webpack_require__.d(__webpack_exports__, "o", function() { return viewInjection; });
/* concated harmony reexport createView */__webpack_require__.d(__webpack_exports__, "i", function() { return createView; });
/* unused concated harmony import createPromiseMiddleware */
/* unused concated harmony import createGeneratorMiddleware */
/* unused concated harmony import pMiddleware */
/* unused concated harmony import gMiddleware */
/* unused concated harmony import effects */
/* concated harmony reexport createActionType */__webpack_require__.d(__webpack_exports__, "e", function() { return createActionType; });
/* unused concated harmony import createActionHandlerType */
/* concated harmony reexport setModuleAction */__webpack_require__.d(__webpack_exports__, "n", function() { return setModuleAction; });
/* unused concated harmony import ModelProperty */
/* unused concated harmony import ModelLifeCycle */
/* unused concated harmony import Exception */
/* unused concated harmony import ajax */
/* unused concated harmony import url */
/* unused concated harmony import APIException */
/* unused concated harmony import RuntimeException */
/* unused concated harmony import ReactLifecycleException */
/* unused concated harmony import NetworkConnectionException */
/* concated harmony reexport addMiddleware */__webpack_require__.d(__webpack_exports__, "c", function() { return dynamicMiddleware_addMiddleware; });
/* unused concated harmony import removeMiddleware */
/* unused concated harmony import resetMiddleware */
/* unused concated harmony import createDynamicMiddleware */
/* concated harmony reexport dynamicMiddleware */__webpack_require__.d(__webpack_exports__, "j", function() { return dynamicMiddleware; });
















/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__(18);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/react/index.js
var react = __webpack_require__(1);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/react-redux/es/index.js + 22 modules
var es = __webpack_require__(14);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/react-loadable/lib/index.js
var lib = __webpack_require__(21);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/react-router/esm/react-router.js + 1 modules
var react_router = __webpack_require__(22);

// CONCATENATED MODULE: ./src/module/main/component/Main.tsx





var HomeView = lib({
    loader: function () { return __webpack_require__.e(/* import() | home */ 1).then(__webpack_require__.bind(null, 81)).then(function (_) { return _.View; }); },
    loading: function () { return null; },
    modules: ["HomeView"],
});
var HomeDetailView = lib({
    loader: function () { return __webpack_require__.e(/* import() | home */ 1).then(__webpack_require__.bind(null, 81)).then(function (_) { return _.View2; }); },
    loading: function () { return null; },
    modules: ["HomeDetailView"],
});
var AboutView = lib({
    loader: function () { return __webpack_require__.e(/* import() | about */ 0).then(__webpack_require__.bind(null, 82)).then(function (_) { return _.View; }); },
    loading: function () { return null; },
    modules: ["AboutView"],
});
var Main_Main = /** @class */ (function (_super) {
    Object(tslib_es6["c" /* __extends */])(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.render = function () {
        var _a = this.props, history = _a.history, name = _a.name;
        return (react["createElement"]("div", null,
            react["createElement"]("div", null,
                react["createElement"]("a", { onClick: function () { return history.push("/home"); } }, "Home"),
                react["createElement"]("a", { onClick: function () { return history.push("/about"); } }, "About")),
            react["createElement"]("br", null),
            name,
            react["createElement"]("br", null),
            react["createElement"](react_router["e" /* Switch */], null,
                react["createElement"](react_router["b" /* Route */], { exact: true, path: "/home", render: function () { return react["createElement"](HomeView, null); } }),
                react["createElement"](react_router["b" /* Route */], { exact: true, path: "/home/detail", render: function () { return react["createElement"](HomeDetailView, null); } }),
                react["createElement"](react_router["b" /* Route */], { exact: true, path: "/about", render: function () { return react["createElement"](AboutView, null); } }))));
    };
    return Main;
}(react["PureComponent"]));
var mapStateToProps = function (state) {
    return {
        name: state.main.name,
    };
};
/* harmony default export */ var component_Main = (Object(es["c" /* connect */])(mapStateToProps)(Object(react_router["g" /* withRouter */])(Main_Main)));

// EXTERNAL MODULE: /Applications/project/own/reaux/packages/reaux-dom/index.ts
var reaux_dom = __webpack_require__(19);

// CONCATENATED MODULE: ./src/module/main/index.ts



var initState = {
    name: "main",
};
var main_ActionHandler = /** @class */ (function (_super) {
    Object(tslib_es6["c" /* __extends */])(ActionHandler, _super);
    function ActionHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActionHandler.prototype.onReady = function () {
        return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
            this.setState({ name: "new main" });
            console.log("common onReady");
            return [2 /*return*/];
        });
    };
    Object(tslib_es6["b" /* __decorate */])([
        reaux_dom["helper"].lifecycle()
    ], ActionHandler.prototype, "onReady", null);
    return ActionHandler;
}(reaux_dom["GModel"]));
var main_module = Object(reaux_dom["register"])(new main_ActionHandler("main", initState));
var actions = main_module.actions;
var View = main_module.proxyView(component_Main);

// CONCATENATED MODULE: ./src/index.ts


Object(reaux_dom["start"])({ Component: View });


/***/ })

},[[80,3,4]]]);