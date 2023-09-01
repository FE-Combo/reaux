import React from "react";
import {hasOwnLifecycle} from "./shared";
import {BaseModel} from "../type";

/**
 * Create Component and proxy component lifecycle
 * @param handler
 * @param actions
 * @param Component
 */
export function createView<H extends BaseModel<{}, any>, P>(handler: H, Component: React.ComponentType<P>) {
    return class View<PP extends P, S extends {} = {}> extends React.PureComponent<P, S> {
        timer: NodeJS.Timer | null = null;
        async componentDidMount() {
            if (hasOwnLifecycle(handler, "onLoad")) {
                await handler.onLoad();
            }

            if (hasOwnLifecycle(handler, "onTick")) {
                this.timer = setInterval(async () => {
                    await handler.onTick();
                }, handler.onTick.interval || 1000);
            }
        }

        async componentDidUpdate(prevProps: PP, prevState: S) {
            if (hasOwnLifecycle(handler, "onUpdate")) {
                await handler.onUpdate(prevProps, prevState);
            }
        }

        async componentWillUnmount() {
            if (hasOwnLifecycle(handler, "onUnload")) {
                await handler.onUnload();
            }

            if (this.timer && hasOwnLifecycle(handler, "onTick")) {
                clearInterval(this.timer);
            }
        }

        render() {
            return <Component {...this.props} />;
        }
    };
}
