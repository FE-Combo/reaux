import {createApp} from "../../src/core/createApp";
import {Store} from "redux";

test("Create App", () => {
    const store = {
        replaceReducer: reducers => {},
    } as Store;
    const app = createApp(store);
    expect(JSON.stringify(app)).toEqual(
        JSON.stringify({
            store,
            actionPHandlers: {},
            actionGHandlers: {},
            actionHandlers: {},
            modules: {},
            exceptionHandler: {},
            asyncReducers: {} as any,
            injectReducer: (reducers: any) => store.replaceReducer(reducers),
        })
    );
    expect(app.injectReducer({main: {}} as any)).toEqual(undefined);
});
