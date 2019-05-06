import React from "react";
import {BaseModel, BaseAppView, ActionTypeView} from "../type";

export function createView<H extends BaseModel<{}>>(app: BaseAppView, handler: H, Component: React.ComponentType<any>, actions: {[type: string]: (...payload: any[]) => ActionTypeView<any[]>}) {
    return class View<P extends {} = {}> extends React.PureComponent<P> {
        constructor(props: P) {
            super(props);

            if ((handler.onReady as any).isLifecycle) {
                app.store.dispatch(actions.onReady());
            }
        }

        componentDidMount() {
            if ((handler.onLoad as any).isLifecycle) {
                app.store.dispatch(actions.onLoad());
            }
        }

        componentDidUpdate(prevProps: Readonly<P>) {
            const prevLocation = (prevProps as any).location;
            const currentLocation = (this.props as any).location;
            const currentRouteParams = (this.props as any).match ? (this.props as any).match.params : null;
            if (currentLocation && currentRouteParams && prevLocation !== currentLocation && (handler.onLoad as any).isLifecycle) {
                // Only trigger if current component is connected to <Route> and call Handler's setHistory
                app.store.dispatch(actions.onLoad());
            }
        }

        componentWillUnmount() {
            if (actions.onUnload) {
                app.store.dispatch(actions.onUnload());
            }
        }

        render() {
            return <Component {...this.props} />;
        }
    };
}
