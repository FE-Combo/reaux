import React from "react";

type ReactComponentKeyOf<T> = {[P in keyof T]: T[P] extends React.ComponentType<any> ? P : never}[keyof T];

export function async<T, K extends ReactComponentKeyOf<T>>(resolve: () => Promise<T>, component: K, loadingComponent: React.ReactNode = null): React.ComponentType<any> {
    interface State {
        Component: React.ComponentType<any> | null;
    }

    class Component extends React.PureComponent<{}, State> {
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
            return Component ? <Component /> : loadingComponent;
        }
    }

    return Component;
}
