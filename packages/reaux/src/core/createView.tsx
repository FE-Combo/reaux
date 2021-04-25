import * as React from "react";
import {ModelProperty, ModelLifeCycle, App, ActionCreators} from "../type";
export type BaseModel<S = {}, R = any> = ModelProperty<S> & ModelLifeCycle<R>;

/**
 * Create Component and proxy component lifecycle
 * @param handler
 * @param actions
 * @param Comp
 */
export function createView<A extends App, H extends BaseModel<{}, any>>(app: A, handler: H, actions: ActionCreators<H>, Comp: React.ComponentType) {
    return class View<P = {}> extends React.PureComponent<P> {
        static moduleName: string = handler.moduleName;
        constructor(props: P) {
            super(props);
            this.onReady();
        }

        onReady() {
            if ("onReady" in actions && (handler.onReady as any).isLifecycle) {
                app.store.dispatch((actions as any).onReady());
            }
        }

        componentDidMount() {
            if ("onLoad" in actions && (handler.onLoad as any).isLifecycle) {
                app.store.dispatch((actions as any).onLoad(true));
            }
        }

        componentDidUpdate() {
            if ("onLoad" in actions && (handler.onLoad as any).isLifecycle) {
                app.store.dispatch((actions as any).onLoad(false));
            }
        }

        componentWillUnmount() {
            if ("onUnload" in actions && (handler.onUnload as any).isLifecycle) {
                app.store.dispatch((actions as any).onUnload());
            }
        }

        render() {
            return <Comp {...this.props} />;
        }
    };
}
