import createApp from "../../src/core/createApp";

test("Create App", () => {
    expect(createApp()).toEqual({
        actionPHandlers: {},
        actionGHandlers: {},
        actionHandler: {},
        modules: {},
        exceptionHandler: {},
    });

    expect(
        createApp(app => {
            return {...app, modules: {a: 1}, store: {}};
        })
    ).toEqual({
        actionPHandlers: {},
        actionGHandlers: {},
        actionHandler: {},
        store: {},
        modules: {a: 1},
        exceptionHandler: {},
    });
});
