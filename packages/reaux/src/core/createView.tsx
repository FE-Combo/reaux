import React from "react";
import {hasOwnLifecycle} from "./shared";
import {BaseModel} from "../type";

/**
 * Create Component and proxy component lifecycle
 * @param handler
 * @param actions
 * @param Component
 */
export function createView<H extends BaseModel<{}, any>>(handler: H, Component: React.ComponentType<any>) {
    return class View<P extends {} = {}> extends React.PureComponent<P> {
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

        async componentDidUpdate() {
            if (hasOwnLifecycle(handler, "onUpdate")) {
                await handler.onUpdate();
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
