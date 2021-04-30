import {Model} from "../../src/core/createModel";
import {createStore} from "redux";
import {createReducer, createModuleReducer} from "../../src/core/createReducer";
import {createApp} from "../../src/core/createApp";
import {App} from "../../src/type";

test("Generate Base On Promise Model And Generator Model ", () => {
    const store = createStore(
        createReducer({
            main: createModuleReducer("main"),
            main2: createModuleReducer("main2"),
        })
    );
    const app: App = createApp(store);
    class PromiseModel extends Model<any> {
        async onReady() {}
        async onLoad(didMount: boolean) {}
        async onUnload() {}
        async onHide() {}
        async test() {}
    }
    const model = new PromiseModel("main", {a: 1, b: "2"});
    model["@@injectApp"](app);
    const promise = async () => {};
    const p = promise();
    expect(model.initState).toEqual({a: 1, b: "2"});
    model.setState({a: 2, b: "b"});
    expect(model.moduleName).toEqual("main");
    expect(model.state).toEqual({a: 2, b: "b"});
    expect(model.initState).toEqual({a: 1, b: "2"});
    expect(model.rootState).toEqual({main: {a: 2, b: "b"}, main2: {}, "@loading": {}, "@error": {}});
    expect(JSON.stringify(model.onReady)).toEqual(JSON.stringify(promise));
    expect(JSON.stringify(model.onLoad)).toEqual(JSON.stringify(promise));
    expect(JSON.stringify(model.onUnload)).toEqual(JSON.stringify(promise));
    expect(JSON.stringify(model.onHide)).toEqual(JSON.stringify(promise));
    expect(model.onReady()).toEqual(p);
    expect(model.onLoad(true)).toEqual(p);
    expect(model.onLoad(false)).toEqual(p);
    expect(model.onUnload()).toEqual(p);
    expect(model.onHide()).toEqual(p);
    expect(model.test()).toEqual(p);
    model.restState();
    expect(model.state).toEqual({a: 1, b: "2"});

    class GeneratorModel extends Model<any> {
        *onReady() {}
        *onLoad(didMount: boolean) {}
        *onUnload() {}
        *onHide() {}
        *test() {}
    }
    const model2 = new GeneratorModel("main2", {a: 11, b: 22});
    model2["@@injectApp"](app);
    const generator = function*(): any {};
    const g = generator();
    expect(model2.initState).toEqual({a: 11, b: 22});
    model2.setState({a: 111, b: 222});
    expect(model2.moduleName).toEqual("main2");
    expect(model2.state).toEqual({a: 111, b: 222});
    expect(model2.initState).toEqual({a: 11, b: 22});
    expect(model2.rootState).toEqual({main: {a: 1, b: "2"}, main2: {a: 111, b: 222}, "@loading": {}, "@error": {}});
    expect(JSON.stringify(model2.onReady)).toEqual(JSON.stringify(generator));
    expect(JSON.stringify(model2.onLoad)).toEqual(JSON.stringify(generator));
    expect(JSON.stringify(model2.onUnload)).toEqual(JSON.stringify(generator));
    expect(JSON.stringify(model2.onHide)).toEqual(JSON.stringify(generator));
    expect(model2.onReady()).toEqual(g);
    expect(model2.onLoad(true)).toEqual(g);
    expect(model2.onLoad(false)).toEqual(g);
    expect(model2.onUnload()).toEqual(g);
    expect(model2.onHide()).toEqual(g);
    expect(model2.test()).toEqual(g);
    model2.restState();
    expect(model2.state).toEqual({a: 11, b: 22});
});
