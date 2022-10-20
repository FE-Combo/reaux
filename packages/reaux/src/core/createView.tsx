import React from "react";
import {ModelProperty, ModelLifeCycle} from "../type";

export type BaseModel<S = {}, R = any> = ModelProperty<S> & ModelLifeCycle<R>;

/**
 * Create Component and proxy component lifecycle
 * @param handler
 * @param actions
 * @param Component
 */
export function createView<H extends BaseModel<{}, any>>(handler: H, Component: React.ComponentType<any>) {
    return class View<P extends {} = {}> extends React.PureComponent<P> {
        async componentDidMount() {
            await handler.onLoad();
        }

        async componentDidUpdate() {
            await handler.onUpdate();
        }

        async componentWillUnmount() {
            await handler.onUnload();
        }

        render() {
            return <Component {...this.props} />;
        }
    };
}
