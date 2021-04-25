import React from "react";
import {BaseModel} from "reaux";
import {RenderOptions, ServerStartReturn, Modules, RegisterReturn} from "./type";
import {isServer} from "./kits";
import {serverStart, clientStart} from "./start";
import realRegister from "./register";
import {genHelper} from "./helper";
import {createHistory} from "./route";
import {genApp} from "./app";

const helperCreator = genHelper();

// TODO: move to genApp? cause lifecycle bug
const history = createHistory();

/**
 * modules cache, when app started store all pre-register
 */
const modules: Modules = {};

/**
 * Start react-dom render.
 * Project entry, trigger once. e.g: main module.
 * @param options
 */
export async function start(options: RenderOptions): Promise<((...args: any[]) => Promise<ServerStartReturn>) | null> {
    const app = genApp(history);
    helperCreator.injectApp(app);
    return isServer ? async (url: string = "/") => await serverStart({...options, url}, modules, app) : await clientStart(options, modules, app, history);
}

/**
 * Register module
 * @param handler
 * @param view
 */
export function register<H extends BaseModel>(handler: H, component: React.ComponentType) {
    if (modules.hasOwnProperty(handler.moduleName)) {
        throw new Error(`module is already registered, module=${handler.moduleName}`);
    }
    const result = {} as RegisterReturn<H>;
    modules[handler.moduleName] = realRegister.bind({handler, component, result});
    return () => result;
}

export const useHelper = () => helperCreator.useHelper();
