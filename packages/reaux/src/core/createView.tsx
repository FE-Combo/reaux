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

            // TODO: 确保setInterval的间隔时间加上异步请求的时间，
            // type:
            // fixed  时间间隔等于指定时间间隔，中间执行异步的时间不影响时间间隔
            // dynamic 时间间隔等于指定时间间隔，中间执行异步的时间超过指定时间间隔，则自动延到下一个时间间隔
            // auto  时间间隔等于指定时间间隔+异步执行时间
            if (hasOwnLifecycle(handler, "onTick")) {
                this.timer = setInterval(async () => {
                    await handler.onTick();
                }, handler.onTick.interval || 1000);
            }
        }

        // TODO: 使用装饰器支持指定依赖更新
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
