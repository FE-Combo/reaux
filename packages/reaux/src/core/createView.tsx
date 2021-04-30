import * as React from "react";
import {ModelProperty, ModelLifeCycle, App, ActionCreators} from "../type";
export type BaseModel<S = {}, R = any> = ModelProperty<S> & ModelLifeCycle<R>;

// tips: -1 -> disable forever; 0 -> never disable; [1,n] disable times
interface LifecycleTimesCache {
    disableExecuteOnReadyTimes: number;
    disableExecuteOnLoadTimes: number;
    disableExecuteOnUnloadTimes: number;
}

export interface CreateViewOptions {
    disableExecuteOnReadyTimes?: number;
    disableExecuteOnLoadTimes?: number;
    disableExecuteOnUnloadTimes?: number;
    afterOnReady?: (state: LifecycleTimesCache) => LifecycleTimesCache;
    afterOnLoad?: (state: LifecycleTimesCache, didMount: boolean) => LifecycleTimesCache;
    afterOnUnload?: (state: LifecycleTimesCache) => LifecycleTimesCache;
}

/**
 * Create Component and proxy component lifecycle
 * @param handler
 * @param actions
 * @param Comp
 */
export function createView<A extends App, H extends BaseModel<{}, any>>(app: A, handler: H, actions: ActionCreators<H>, Comp: React.ComponentType, lifecycleOptions: CreateViewOptions = {}): React.ComponentType<any> {
    const {disableExecuteOnReadyTimes, disableExecuteOnLoadTimes, disableExecuteOnUnloadTimes, afterOnReady, afterOnLoad, afterOnUnload} = lifecycleOptions;

    // TODO: why not store in component
    const cache: LifecycleTimesCache = {
        disableExecuteOnReadyTimes: disableExecuteOnReadyTimes || 0,
        disableExecuteOnLoadTimes: disableExecuteOnLoadTimes || 0,
        disableExecuteOnUnloadTimes: disableExecuteOnUnloadTimes || 0,
    };

    return class View<P = {}> extends React.PureComponent<P> {
        static moduleName: string = handler.moduleName;
        constructor(props: P) {
            super(props);
            this.onReady();
        }

        componentDidMount() {
            this.onLoad(true);
        }

        componentDidUpdate() {
            this.onLoad(false);
        }

        componentWillUnmount() {
            this.onUnLoad();
        }

        onReady = () => {
            if ("onReady" in actions && (handler.onReady as any).isLifecycle) {
                if (cache.disableExecuteOnReadyTimes === 0) {
                    app.store.dispatch((actions as any).onReady());
                }
                if (cache.disableExecuteOnReadyTimes > 0) {
                    cache.disableExecuteOnReadyTimes = cache.disableExecuteOnReadyTimes - 1;
                }
                this.afterExecuteLifecycle(afterOnReady);
            }
        };

        onLoad = (didMount: boolean) => {
            if ("onLoad" in actions && (handler.onLoad as any).isLifecycle) {
                if (cache.disableExecuteOnLoadTimes === 0) {
                    app.store.dispatch((actions as any).onLoad(didMount));
                }
                if (cache.disableExecuteOnLoadTimes > 0) {
                    cache.disableExecuteOnLoadTimes = cache.disableExecuteOnLoadTimes = 1;
                }
                this.afterExecuteLifecycle(afterOnLoad, {didMount});
            }
        };

        onUnLoad = () => {
            if ("onUnload" in actions && (handler.onUnload as any).isLifecycle) {
                if (cache.disableExecuteOnUnloadTimes === 0) {
                    app.store.dispatch((actions as any).onUnload());
                }
                if (cache.disableExecuteOnUnloadTimes > 0) {
                    cache.disableExecuteOnUnloadTimes = cache.disableExecuteOnUnloadTimes - 1;
                }
                this.afterExecuteLifecycle(afterOnUnload);
            }
        };

        afterExecuteLifecycle = (callback?: (state: LifecycleTimesCache, ...restOptions: any[]) => LifecycleTimesCache, ...restOptions: any[]) => {
            if (typeof callback === "function") {
                const {disableExecuteOnReadyTimes, disableExecuteOnLoadTimes, disableExecuteOnUnloadTimes} = callback(
                    {
                        disableExecuteOnReadyTimes: cache.disableExecuteOnReadyTimes,
                        disableExecuteOnLoadTimes: cache.disableExecuteOnLoadTimes,
                        disableExecuteOnUnloadTimes: cache.disableExecuteOnUnloadTimes,
                    },
                    ...restOptions
                );
                cache.disableExecuteOnReadyTimes = disableExecuteOnReadyTimes;
                cache.disableExecuteOnLoadTimes = disableExecuteOnLoadTimes;
                cache.disableExecuteOnUnloadTimes = disableExecuteOnUnloadTimes;
            }
        };

        render() {
            return <Comp {...this.props} />;
        }
    };
}
