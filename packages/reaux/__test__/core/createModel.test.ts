import {createModel} from "../../src/core/createModel";
import {createStore} from "redux";
import {createReducer, createModuleReducer} from "../../src/core/createReducer";
import {createApp} from "../../src/core/createApp";
import {setModuleAction} from "../../src/core/shared";
import {App} from "../../src/type";

test("Generate Base On Model ", () => {
    const store = createStore(
        createReducer({
            main: createModuleReducer("main"),
            main2: createModuleReducer("main2"),
        })
    );
    const app: App = createApp(store);
    const Model = createModel(() => app);

    class PromiseModel extends Model<any> {
        async onReady() {}
        async onLoad() {}
        async onUnload() {}
        async onHide() {}
        async test() {}
    }
    const model = new PromiseModel("main", {a: 1, b: "2"});
    const promise = async () => {};
    const p = promise();
    expect(model.initState).toEqual({a: 1, b: "2"});
    model.setState({a: 2, b: "b"});
    expect(model.moduleName).toEqual("main");
    expect(model.state).toEqual({a: 2, b: "b"});
    expect(model.initState).toEqual({a: 1, b: "2"});
    expect(model.initialState).toEqual({a: 1, b: "2"});
    expect(model.rootState).toEqual({main: {a: 2, b: "b"}, main2: {}, "@loading": {}, "@error": {}});
    expect(JSON.stringify(model.onReady)).toEqual(JSON.stringify(promise));
    expect(JSON.stringify(model.onLoad)).toEqual(JSON.stringify(promise));
    expect(JSON.stringify(model.onUnload)).toEqual(JSON.stringify(promise));
    expect(JSON.stringify(model.onHide)).toEqual(JSON.stringify(promise));
    expect(model.onReady()).toEqual(p);
    expect(model.onLoad()).toEqual(p);
    expect(model.onUnload()).toEqual(p);
    expect(model.onHide()).toEqual(p);
    expect(model.test()).toEqual(p);
    model.resetState();
    expect(model.state).toEqual({a: 1, b: "2"});
    model.dispatch(setModuleAction("main", {a: 2, b: "3"}));
    expect(model.state).toEqual({a: 2, b: "3"});
});
