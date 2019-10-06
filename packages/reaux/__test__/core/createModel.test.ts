import createModel, {createBaseModelPromise, createBaseModelGenerator} from "../../src/core/createModel";

test("Create Model", () => {
    const allState = {
        app: {main: {}, home: {}},
        loading: {load: 0},
    };
    const dispatchState = (module: string, state: object, type: string) => {
        allState.app[module] = {...allState.app[module], ...state};
    };

    const Model = createModel(allState, dispatchState);
    const model = new Model("main", {a: 1, b: 2});

    expect(model.state).toEqual({a: 1, b: 2});
    model.setState({b: "b", c: "c"});
    expect(model.state).toEqual({a: 1, b: "b", c: "c"});
    expect(model.rootState).toEqual(allState);
});

test("Create Base Model On Promise", () => {
    const allState = {
        app: {main: {}, home: {}},
        loading: {load: 0},
    };
    const dispatchState = (module: string, state: object, type: string) => {
        allState.app[module] = {...allState.app[module], ...state};
    };
    const Model = createBaseModelPromise(allState, dispatchState);
    const model = new Model("main", {a: 1, b: 2});
    const promise = async () => {};
    const p = promise();

    expect(model.state).toEqual({a: 1, b: 2});
    model.setState({b: "b", c: "c"});
    expect(model.state).toEqual({a: 1, b: "b", c: "c"});
    expect(model.rootState).toEqual(allState);
    expect(JSON.stringify(model.onReady)).toEqual(JSON.stringify(promise));
    expect(JSON.stringify(model.onLoad)).toEqual(JSON.stringify(promise));
    expect(JSON.stringify(model.onUnload)).toEqual(JSON.stringify(promise));
    expect(JSON.stringify(model.onHide)).toEqual(JSON.stringify(promise));
    expect(model.onReady()).toEqual(p);
    expect(model.onLoad()).toEqual(p);
    expect(model.onUnload()).toEqual(p);
    expect(model.onHide()).toEqual(p);
});

test("Create Base Model On Generator", () => {
    const allState = {
        app: {main: {}, home: {}},
        loading: {load: 0},
    };
    const dispatchState = (module: string, state: object, type: string) => {
        allState.app[module] = {...allState.app[module], ...state};
    };
    const Model = createBaseModelGenerator(allState, dispatchState);
    const model = new Model("main", {a: 11, b: 22});
    const generator = function*(): any {};
    const g = generator();

    expect(model.state).toEqual({a: 11, b: 22});
    model.setState({b: "b", c: "c"});
    expect(model.state).toEqual({a: 11, b: "b", c: "c"});
    expect(model.rootState).toEqual(allState);
    expect(JSON.stringify(model.onReady)).toEqual(JSON.stringify(generator));
    expect(JSON.stringify(model.onLoad)).toEqual(JSON.stringify(generator));
    expect(JSON.stringify(model.onUnload)).toEqual(JSON.stringify(generator));
    expect(JSON.stringify(model.onHide)).toEqual(JSON.stringify(generator));
    expect(model.onReady()).toEqual(g);
    expect(model.onLoad()).toEqual(g);
    expect(model.onUnload()).toEqual(g);
    expect(model.onHide()).toEqual(g);
});
