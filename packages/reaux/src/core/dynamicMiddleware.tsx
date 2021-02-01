import {compose} from "redux";

// TODO: remove any
const createDynamicMiddleware = () => {
    let allDynamicMiddleware: any[] = [];
    let allAppliedDynamicMiddleware: any[] = [];
    let store: any;

    const enhancer = (_store: any) => {
        store = _store;
        return (next: any) => (action: any) => {
            return (compose(...allAppliedDynamicMiddleware)(next) as any)(action);
        };
    };

    const addMiddleware = (...middleware: any[]) => {
        allAppliedDynamicMiddleware.push(...middleware.map(middleware => middleware(store)));
        allDynamicMiddleware.push(...middleware);
    };

    const removeMiddleware = (middleware: any) => {
        const index = allDynamicMiddleware.findIndex(d => d === middleware);

        if (index === -1) {
            // eslint-disable-next-line no-console
            console.error("Middleware does not exist!", middleware);
            return;
        }

        allDynamicMiddleware = allDynamicMiddleware.filter((_, mdwIndex) => mdwIndex !== index);
        allAppliedDynamicMiddleware = allAppliedDynamicMiddleware.filter((_, mdwIndex) => mdwIndex !== index);
    };

    const resetMiddleware = () => {
        allAppliedDynamicMiddleware = [];
        allDynamicMiddleware = [];
    };

    return {
        enhancer,
        addMiddleware,
        removeMiddleware,
        resetMiddleware,
    };
};

const dynamicMiddlewareInstance = createDynamicMiddleware();

const dynamicMiddleware = dynamicMiddlewareInstance.enhancer;

export const {addMiddleware, removeMiddleware, resetMiddleware} = dynamicMiddlewareInstance;

export {createDynamicMiddleware, dynamicMiddleware};
