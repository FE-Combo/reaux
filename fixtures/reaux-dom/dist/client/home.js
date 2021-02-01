(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__(18);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/react/index.js
var react = __webpack_require__(1);

// EXTERNAL MODULE: /Applications/project/own/reaux/node_modules/react-redux/es/index.js + 22 modules
var es = __webpack_require__(14);

// CONCATENATED MODULE: ./src/module/home/component/Main.tsx




var Main_Main = /** @class */ (function (_super) {
    Object(tslib_es6["c" /* __extends */])(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.render = function () {
        var _this = this;
        return (react["createElement"]("div", null,
            this.props.name,
            react["createElement"]("button", { onClick: function () {
                    _this.props.dispatch(actions.test());
                } }, "Test")));
    };
    return Main;
}(react["PureComponent"]));
var mapStateToProps = function (state) {
    return {
        name: state.home.name,
    };
};
/* harmony default export */ var component_Main = (Object(es["c" /* connect */])(mapStateToProps)(Main_Main));

// EXTERNAL MODULE: /Applications/project/own/reaux/packages/reaux-dom/index.ts
var reaux_dom = __webpack_require__(19);

// CONCATENATED MODULE: ./src/module/home/component/Detail.tsx



var Detail_Main = /** @class */ (function (_super) {
    Object(tslib_es6["c" /* __extends */])(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.render = function () {
        return react["createElement"]("div", null, "Home Detail");
    };
    return Main;
}(react["PureComponent"]));
var Detail_mapStateToProps = function (state) {
    return {
        name: state.home.name,
    };
};
/* harmony default export */ var Detail = (Object(es["c" /* connect */])(Detail_mapStateToProps)(Detail_Main));

// CONCATENATED MODULE: ./src/module/home/index.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actions", function() { return actions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View", function() { return View; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View2", function() { return View2; });




// import {SagaIterator} from "redux-saga";
var initState = {
    name: "home",
};
var home_ActionHandler = /** @class */ (function (_super) {
    Object(tslib_es6["c" /* __extends */])(ActionHandler, _super);
    function ActionHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActionHandler.prototype.onReady = function () {
        return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
            console.log("home generator onReady");
            return [2 /*return*/];
        });
    };
    ActionHandler.prototype.test = function () {
        return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, "1"];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, "2"];
                case 2:
                    _a.sent();
                    this.setState({ name: "new Name" });
                    return [2 /*return*/, "3"];
            }
        });
    };
    Object(tslib_es6["b" /* __decorate */])([
        reaux_dom["helper"].lifecycle()
    ], ActionHandler.prototype, "onReady", null);
    return ActionHandler;
}(reaux_dom["GModel"]));
var home_module = Object(reaux_dom["register"])(new home_ActionHandler("home", initState));
var actions = home_module.actions;
var View = home_module.proxyView(component_Main);
var View2 = home_module.proxyView(Detail);


/***/ })

}]);