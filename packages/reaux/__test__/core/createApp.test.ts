import {createApp} from "../../src/core/createApp";
import {Store} from "redux";

test("Create App", () => {
    const store = {} as Store;
    expect(createApp(store)).toEqual({
        store,
        actionPHandlers: {},
        actionGHandlers: {},
        actionHandlers: {},
        modules: {},
        exceptionHandler: {},
    });
});
