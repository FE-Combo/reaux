import React from "react";

type ReactComponentKeyOf<T> = {[P in keyof T]: T[P] extends React.ComponentType<any> ? P : never}[keyof T];

interface State {
    Component: React.ComponentType<any> | null;
}

export default function Async<T, K extends ReactComponentKeyOf<T>>(resolve: () => Promise<T>, component: K, loadingComponent: React.ReactNode = null): T[K] {
    return class AsyncWrapperComponent extends React.PureComponent<{}, State> {
        state: State = {
            Component: null,
        };

        componentDidMount() {
            const promise = resolve();
            promise.then(module => {
                const Component = module[component] as any;
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
 * TODO: 使用React.lazy/React.Suspense替代，但是目前React.Suspense无法用于数据获取的情况
 */
