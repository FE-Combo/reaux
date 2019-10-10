import Async from "./src/component/Async";

import ErrorBoundary from "./src/component/ErrorBoundary";

import createAction, {ActionsType} from "./src/core/createAction";

import createApp from "./src/core/createApp";

import {injection as modelInjection, BaseOnPromiseModel, BaseOnGeneratorModel} from "./src/core/createModel";

import createReducer, {setStateAction, setLoadingAction} from "./src/core/createReducer";

import saga, {setErrorAction} from "./src/core/saga";

import {createCView, createFCView} from "./src/core/createView";

import {AppView, StateView, BaseModel, ErrorHandler, ModelLifeCycle, ActionHandler} from "./src/type";

import {gMiddleware} from "./src/core/generator";

export {createAction, createApp, modelInjection, BaseOnPromiseModel, BaseOnGeneratorModel, createReducer, setStateAction, setLoadingAction, setErrorAction, createCView, createFCView, saga, gMiddleware};

export {Async, ErrorBoundary};

export {AppView, StateView, BaseModel, ErrorHandler, ModelLifeCycle, ActionHandler, ActionsType};
