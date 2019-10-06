/*
    proxy LifeCycle
*/

import React from "react";
import {BaseModel} from "../type";

export function createCView<H extends BaseModel<{}, any>>(handler: H, Component: React.ComponentType<any>) {
    return class View<P extends {} = {}> extends React.PureComponent<P> {
        constructor(props: P) {
            super(props);
            handler.onReady();
        }

        componentDidMount() {
            handler.onLoad();
        }

        componentDidUpdate() {
            handler.onLoad();
        }

        componentWillUnmount() {
            handler.onUnload();
        }

        render() {
            return <Component {...this.props} />;
        }
    };
}

export function createFCView<H extends BaseModel<{}, any>>(handler: H, Component: React.ComponentType<any>) {
    // TODO:
}
