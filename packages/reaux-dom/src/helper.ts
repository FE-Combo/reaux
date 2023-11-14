import {ModelLifeCycle, App, setModuleAction, createActionType} from "reaux";
import {AnyAction} from "redux";
import {StateView} from "./type";

type ActionHandler = (...args: any[]) => any;

type HandlerDecorator = (target: object, name: string | symbol, descriptor: TypedPropertyDescriptor<ActionHandler>) => TypedPropertyDescriptor<ActionHandler>;

type HandlerInterceptor<S> = (handler: ActionHandler, state: Readonly<S>) => any;

type LifeCycleDecorator = (target: object, propertyKey: keyof ModelLifeCycle, descriptor: TypedPropertyDescriptor<ActionHandler & {isLifecycle?: boolean; interval?: number}>) => TypedPropertyDescriptor<ActionHandler>;

interface Options {
    callback: (target: object, name: string | symbol, descriptor: TypedPropertyDescriptor<ActionHandler>) => void;
}

// TODO:move to reaux
export function handlerDecorator<S extends StateView>(interceptor: HandlerInterceptor<S>, options?: Options): HandlerDecorator {
    return (target, name, descriptor) => {
        const fn = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            const rootState: S = (target as any).rootState;
            await interceptor(fn!.bind(this, ...args), rootState);
        };
        if (options && typeof options.callback === "function") {
            options.callback(target, name, descriptor);
        }
        return descriptor;
    };
}

export class Helper {
    appCache: App;
    constructor(app: App) {
        this.appCache = app;
    }
    // Only used internally, use `this.dispatch(action)` in model
    private put<T extends AnyAction>(action: T) {
        this.appCache.store.dispatch(action);
    }
    loading(identifier = "global"): HandlerDecorator {
        // eslint-disable-next-line
        const that = this;
        return handlerDecorator(async function (handler) {
            try {
                const nextLoadingState = that.appCache.store.getState()["@loading"];
                nextLoadingState[identifier] = nextLoadingState[identifier] + 1 || 1;
                that.put(setModuleAction("@loading", nextLoadingState));
                await handler();
            } catch (error) {
                that.put({
                    type: createActionType("@error"),
                    payload: {
                        type: "loading-error",
                        message: error.message,
                        stack: error.stack,
                    },
                });
                console.error("loading error:", error);
            } finally {
                const nextLoadingState = that.appCache.store.getState()["@loading"];
                nextLoadingState[identifier] = nextLoadingState[identifier] - 1 || 0;
                that.put(setModuleAction("@loading", nextLoadingState));
            }
        });
    }
    lifecycle(): LifeCycleDecorator {
        return (target, propertyKey, descriptor) => {
            descriptor.value!.isLifecycle = true;
            return descriptor;
        };
    }

    interval(value = 1): LifeCycleDecorator {
        return (target, propertyKey, descriptor) => {
            descriptor.value!.interval = value * 1000;
            return descriptor;
        };
    }

    isLoading(identifier = "global"): boolean {
        const loading = this.appCache.store.getState()["@loading"];
        return !!(loading && loading[identifier] > 0);
    }

    async delay(ms: number) {
        await new Promise((resolve) => setTimeout(resolve, ms));
    }
}
