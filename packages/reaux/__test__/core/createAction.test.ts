import {createAction} from "../../src/core/createAction";
import {createModel} from "../../src/core/createModel";
import {createActionHandlerType} from "../../src/core/shared";
import {createStore} from "redux";
import {createReducer, createModuleReducer} from "../../src/core/createReducer";
import {createApp} from "../../src/core/createApp";
import {App} from "../../src/type";

test.only("Create Action", () => {
    const store = createStore(
        createReducer({
            main: createModuleReducer("main"),
            main2: createModuleReducer("main2"),
        })
    );
    const app: App = createApp(store);

    const ReauxModel = createModel(app);

    class Model extends ReauxModel<any> {
        fn1() {}
        fn2(a: any, b: any) {
            return {a, b};
        }
    }

    const handler = new Model("moduleName", {});

    // Why use JSON.stringify()? because exist anonymous function. ref: https://www.hellojava.com/a/70916.html
    expect(JSON.stringify(createAction(handler))).toEqual(
        JSON.stringify({
            actions: {
                fn1: (...payload: any[]) => ({type: "@@framework/actionHandler/moduleName/fn1", payload}),
                fn2: (...payload: any[]) => ({type: "@@framework/actionHandler/moduleName/fn2", payload}),
            },
            actionHandlers: {
                [createActionHandlerType("moduleName", "fn1")]: handler.fn1.bind(handler),
                [createActionHandlerType("moduleName", "fn2")]: handler.fn2.bind(handler),
            },
        })
    );

    expect(createAction(handler).actions.fn1()).toEqual({
        type: createActionHandlerType("moduleName", "fn1"),
        payload: [],
    });
    expect(createAction(handler).actions.fn2(1, 2)).toEqual({
        type: createActionHandlerType("moduleName", "fn2"),
        payload: [1, 2],
    });

    expect(createAction(handler).actionHandlers[createActionHandlerType("moduleName", "fn1")]()).toBe(undefined);
    expect(createAction(handler).actionHandlers[createActionHandlerType("moduleName", "fn2")](1, 2)).toEqual({a: 1, b: 2});
});
