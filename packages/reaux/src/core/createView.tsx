import React from "react";
import {ModelProperty, ModelLifeCycle} from "../type";

export type BaseModel<S = {}, R = any> = ModelProperty<S> & ModelLifeCycle<R>;

/**
 * Create Component and proxy component lifecycle
 * @param handler
 * @param Component
 */
export function createView<H extends BaseModel<{}, any>>(handler: H, Component: React.ComponentType<any>) {
    return class View<P extends {} = {}> extends React.PureComponent<P> {
        constructor(props: P) {
            super(props);
            handler.onReady();
        }

        componentDidMount() {
            handler.onLoad(true);
        }

        componentDidUpdate() {
            handler.onLoad(false);
        }

        componentWillUnmount() {
            handler.onUnload();
        }

        render() {
            return <Component {...this.props} />;
        }
    };
}
