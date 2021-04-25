import * as React from "react";

export type ReactComponentKeyOf<T> = {[P in keyof T]: T[P] extends React.ComponentType<any> ? P : never}[keyof T];

interface State {
    Component: React.ComponentType<any> | null;
}

export function Async<T extends {default: () => {component: React.ComponentType}}>(resolve: () => Promise<T>, loadingComponent: React.ReactNode = null): React.ComponentType {
    return class AsyncWrapperComponent extends React.PureComponent<{}, State> {
        state: State = {
            Component: null,
        };

        componentDidMount() {
            const promise = resolve();
            promise.then(module => {
                const Component = module.default().component;
                this.setState({Component});
            });
        }

        render() {
            const {Component} = this.state;
            return Component ? <Component {...this.props} /> : loadingComponent;
        }
    } as any;
}

/**
 * TODO: 使用React.lazy/React.Suspense替代，但是目前React.Suspense一样无法用于服务端数据获取的情况
 */
