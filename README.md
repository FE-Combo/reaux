<img src="./config/logo.png" alt="LOGO" />

[![Build Status](https://travis-ci.com/vocoWone/reaux.svg?branch=master)](https://travis-ci.com/vocoWone/reaux)
![downloads](https://img.shields.io/npm/dt/reaux.svg)
[![codecov](https://codecov.io/gh/vocoWone/reaux/branch/master/graph/badge.svg)](https://codecov.io/gh/vocoWone/reaux)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/vocoWone/reaux.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/vocoWone/reaux/context:javascript)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/vocoWone/reaux.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/vocoWone/reaux/alerts/)

FE lightweight framework base on react + redux, strict in TypeScript.

## Motivation

- **Learn Once, Write Anywhere:** Base on react and redux, no mutation.
- **Multi-End isomorphism:** Data flow isomorphism.
- **High Readability:** Clear code structure, easier for development and maintenance.

## Feature

- The whole project split into some modules.
- Each module contain 1 view, 1 module(contain 1 state and some actions).
- Each module implement its own lifecycle actions. e.g: onReady/onLoad etc.
- No matter sync or async, each action handler wrapped by promise or generator.
- Global error handler.
- Built-in helper.

## Ecosystem

| Project      | Status                                                                                                                 | Description                                    |
| ------------ | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| reaux        | [![npm version](https://img.shields.io/npm/v/reaux.svg?style=flat)](https://www.npmjs.com/package/reaux)               | Flux architecture based on React and Redux     |
| reaux-dom    | [![npm version](https://img.shields.io/npm/v/reaux-dom.svg?style=flat)](https://www.npmjs.com/package/reaux-dom)       | Base on reaux and react-dom applied to website |
| reaux-native | [![npm version](https://img.shields.io/npm/v/reaux-native.svg?style=flat)](https://www.npmjs.com/package/reaux-native) | Base on reaux and react-native applied to app  |
| reaux-next   | [![npm version](https://img.shields.io/npm/v/reaux-next.svg?style=flat)](https://www.npmjs.com/package/reaux-next)     | Base on reaux and nextjs applied to nextjs app              |
| reaux-cli    | [![npm version](https://img.shields.io/npm/v/reaux-cli.svg?style=flat)](https://www.npmjs.com/package/reaux-cli)       | Project scaffolding                            |

## Core API
- start：launch application
    - Component：entrance component
    - onError：Customize the onerror event. The framework outputs error by default and stores error.stack in redux.
    - onUnhandledRejection：Customize the onunhandledrejection event. The framework outputs error by default and stores error.reason in redux.(only supported in reaux-dom)

- register：register module
    - handler：model instance
    - Component：module component

- helper：help funcitons
  - delay: sleep
  - loading: decorator, unified management of loading state
  - isLoading: determine whether the loading state is active
  - interval: for onTick() only, to specify to tick interval in second.

- Model：generate model instance
  - onReady: executed before the component is rendered, execute only once
  - onLoad: similar to componentDidMount, the top-level module will be executed after the child module is loaded
  - onUpdate: similar to componentDidUpdate
  - onUnLoad: similar to componentWillUnmount
  - onShow: The current module is triggered in the viewport, unable to use proxyLifeCycle component
  - onHide: The current module is not triggered in the viewport, unable to use proxyLifeCycle component
  - onTick: Periodic call (default 1s), can use the @helper.interval decorator to specify the period (in seconds)
  - state: current module state
  - rootState: root state
  - resetState: reset state
  - setState: update state

### Model

- proxy state and action.

```
// in website
import { Model} from "reaux-dom";
import {State} from "xxx/xxx/type";
const initialState: State = {
    name: "name",
};
class ActionHandler extends Model<State> {
    async test() {
        this.setState({name: "new name"});
    }
}

//in app
import { Model} from "reaux-native";
import {State} from "xxx/xxx/type";
const initialState: State = {
    name: "name",
};
class ActionHandler extends Model<State> {
    async test() {
        this.setState({name: "new name"});
    }
}
```

### register

- Register a module.

```
// in website
import Component from "xxx/xxx/Main.tsx";
import {register, Model} from "reaux-dom";
import {State} from "xxx/xxx/type";
const initialState: State = {
    name: "name",
};
class ActionHandler extends Model<State> {
    async test() {
        this.setState({name: "new name"});
    }
}
export const {actions, View} = register(new ActionHandler("main", initialState), Component);

// in app
import Component from "xxx/xxx/Main.tsx";
import {register, Model} from "reaux-native";
import {State} from "xxx/xxx/type";
const initialState: State = {
    name: "name",
};
class ActionHandler extends Model<State> {
    async test() {
        this.setState({name: "new name"});
    }
}
export const {actions, View} = register(new ActionHandler("main", initialState), Component);
```

### start

- The whole project entrance.

```
// in website
import {start} from "reaux-dom";
import {View} from "xxx/xxx/Main.tsx";
start({
    Component: View,
});

// in app
import {start} from "reaux-native";
import {View} from "module/main";
start({
    Component: View,
});
```

## Installation

- Base on react-dom project: `yarn add reaux-dom --save or npm install reaux-dom --save`
- Base on react-native project:`yarn add reaux-native --save or npm install reaux-native --save`

## Attention
- When using react-router for routing jumps, the status of redux.router is not updated？
    - Detect whether to create additional BrowserRouter, HashRouter, etc. The framework has built-in BrowserRouter without manual creation.

## Documentation

(TO BE DONE)

## TODO
- Integrate H5, mini-app, electron
- PWA
