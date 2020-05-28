import React from "react";
import {ModelProperty, ModelLifeCycle, App, ActionCreators} from "../type";

let appCache: App | null = null;

export function viewInjection(app: App) {
    appCache = app;
}

export type BaseModel<S = {}, R = any> = ModelProperty<S> & ModelLifeCycle<R>;

/**
 * Create Component and proxy component lifecycle
 * @param handler
 * @param actions
 * @param Component
 */
export function createView<H extends BaseModel<{}, any>>(handler: H, actions: ActionCreators<H>, Component: React.ComponentType<any>) {
    return class View<P extends {} = {}> extends React.PureComponent<P> {
        constructor(props: P) {
            super(props);
            if (!appCache) {
                throw new Error("Execute the injection function before using View only!!");
            }
            if ("onReady" in actions && (handler.onReady as any).isLifecycle) {
                appCache!.store.dispatch((actions as any).onReady());
            }
        }

        componentDidMount() {
            if ("onLoad" in actions && (handler.onLoad as any).isLifecycle) {
                appCache!.store.dispatch((actions as any).onLoad(true));
            }
        }

        componentDidUpdate() {
            if ("onLoad" in actions && (handler.onLoad as any).isLifecycle) {
                appCache!.store.dispatch((actions as any).onLoad(false));
            }
        }

        componentWillUnmount() {
            if ("onUnload" in actions && (handler.onUnload as any).isLifecycle) {
                appCache!.store.dispatch((actions as any).onUnload());
            }
        }

        render() {
            return <Component {...this.props} />;
        }
    };
}
