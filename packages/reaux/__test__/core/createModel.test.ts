import {modelInjection, BaseOnPromiseModel, BaseOnGeneratorModel} from "../../src/core/createModel";
import {createStore} from "redux";
import {createReducer} from "../../src/core/createReducer";
import {createApp} from "../../src/core/createApp";
import {App} from "../../src/type";

test("Generate Base On Promise Model And Generator Model ", () => {
    expect(() => new BaseOnPromiseModel("name", {})).toThrowError();
    expect(() => new BaseOnGeneratorModel("name2", {})).toThrowError();

    const store = createStore(createReducer());
    const app: App = createApp(store);
    modelInjection(app);

    const model = new BaseOnPromiseModel("main", {a: 1, b: "2"});
    const promise = async () => {};
    const p = promise();
    expect(model.state).toEqual({a: 1, b: "2"});
    model.setState({a: 2, b: "b"});
    expect(model.state).toEqual({a: 2, b: "b"});
    expect(model.rootState).toEqual({app: {main: {a: 2, b: "b"}}, helper: {}});
    expect(JSON.stringify(model.onReady)).toEqual(JSON.stringify(promise));
    expect(JSON.stringify(model.onLoad)).toEqual(JSON.stringify(promise));
    expect(JSON.stringify(model.onUnload)).toEqual(JSON.stringify(promise));
    expect(JSON.stringify(model.onHide)).toEqual(JSON.stringify(promise));
    expect(model.onReady()).toEqual(p);
    expect(model.onLoad()).toEqual(p);
    expect(model.onUnload()).toEqual(p);
    expect(model.onHide()).toEqual(p);

    const model2 = new BaseOnGeneratorModel("main2", {a: 11, b: 22});
    const generator = function*(): any {};
    const g = generator();
    expect(model2.state).toEqual({a: 11, b: 22});
    model2.setState({a: 111, b: 222});
    expect(model2.state).toEqual({a: 111, b: 222});
    expect(model2.rootState).toEqual({app: {main: {a: 2, b: "b"}, main2: {a: 111, b: 222}}, helper: {}});
    expect(JSON.stringify(model2.onReady)).toEqual(JSON.stringify(generator));
    expect(JSON.stringify(model2.onLoad)).toEqual(JSON.stringify(generator));
    expect(JSON.stringify(model2.onUnload)).toEqual(JSON.stringify(generator));
    expect(JSON.stringify(model2.onHide)).toEqual(JSON.stringify(generator));
    expect(model2.onReady()).toEqual(g);
    expect(model2.onLoad()).toEqual(g);
    expect(model2.onUnload()).toEqual(g);
    expect(model2.onHide()).toEqual(g);
});
