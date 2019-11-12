# [Reaux](https://www.vocowone.com/) &middot;

[![Build Status](https://travis-ci.com/vocoWone/reaux.svg?branch=master)](https://travis-ci.com/vocoWone/reaux)
[![codecov](https://codecov.io/gh/vocoWone/reaux/branch/master/graph/badge.svg)](https://codecov.io/gh/vocoWone/reaux)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/vocoWone/reaux.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/vocoWone/reaux/context:javascript)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/vocoWone/reaux.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/vocoWone/reaux/alerts/)

FE lightweight framework base on react + redux + axios, strict in TypeScript.

## Motivation

- **Learn Once, Write Anywhere:** Base on react and redux, no mutation.
- **Multi-End isomorphism:** Unifies the application of `Model/View/Action`.
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

## Core API

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
    *test(): SagaIterator {
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
    *test(): SagaIterator {
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
    *test(): SagaIterator {
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
    *test(): SagaIterator {
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

## Documentation

See detail [on the website](http://www.vocowone.com/note/5d0a0885e0bc093273281464).

## TODO

- SSR
- User behavior tracking
- Integrate H5, mini-app, electron
- PWA
