(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__(18);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/react/index.js
var react = __webpack_require__(1);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/react-redux/es/index.js + 22 modules
var es = __webpack_require__(14);

// CONCATENATED MODULE: ./src/module/about/component/Main.tsx




var Main_Main = /** @class */ (function (_super) {
    Object(tslib_es6["c" /* __extends */])(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.render = function () {
        var _this = this;
        return (react["createElement"]("div", null,
            this.props.name,
            react["createElement"]("button", { onClick: function () { return _this.props.dispatch(actions.test()); } }, "change")));
    };
    return Main;
}(react["PureComponent"]));
var mapStateToProps = function (state) {
    return {
        name: state.about.name,
    };
};
/* harmony default export */ var component_Main = (Object(es["c" /* connect */])(mapStateToProps)(Main_Main));

// EXTERNAL MODULE: /Applications/project/own/reaux/packages/reaux-dom/index.ts
var reaux_dom = __webpack_require__(19);

// CONCATENATED MODULE: ./src/module/about/index.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actions", function() { return actions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View", function() { return View; });



var initState = {
    name: "about",
};
var about_ActionHandler = /** @class */ (function (_super) {
    Object(tslib_es6["c" /* __extends */])(ActionHandler, _super);
    function ActionHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActionHandler.prototype.onReady = function () {
        return Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function () {
            return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
                console.log("about promise onReady");
                return [2 /*return*/];
            });
        });
    };
    ActionHandler.prototype.test = function () {
        return Object(tslib_es6["a" /* __awaiter */])(this, void 0, void 0, function () {
            return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
                this.setState({ name: "new about" });
                return [2 /*return*/];
            });
        });
    };
    Object(tslib_es6["b" /* __decorate */])([
        reaux_dom["helper"].lifecycle()
    ], ActionHandler.prototype, "onReady", null);
    return ActionHandler;
}(reaux_dom["PModel"]));
var _a = Object(reaux_dom["register"])(new about_ActionHandler("about", initState)), actions = _a.actions, proxyView = _a.proxyView;
var View = proxyView(component_Main);



/***/ })

}]);