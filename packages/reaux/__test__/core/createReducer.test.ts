import createReducer, {setStateAction, setLoadingAction} from "../../src/core/createReducer";

test("Set State Action", () => {
    expect(setStateAction("moduleName", {name: "name", age: 11}, "type")).toEqual({
        type: "type",
        name: "@@framework/setState",
        payload: {module: "moduleName", state: {name: "name", age: 11}},
    });

    expect(setStateAction("moduleName2", {name: "name2", age: 22}, "type2")).toEqual({
        type: "type2",
        name: "@@framework/setState",
        payload: {module: "moduleName2", state: {name: "name2", age: 22}},
    });
});

test("Set Loading Action", () => {
    expect(setLoadingAction("identifier", true)).toEqual({
        type: "@@framework/loading",
        payload: {identifier: "identifier", hasShow: true},
    });

    expect(setLoadingAction("identifier2", false)).toEqual({
        type: "@@framework/loading",
        payload: {identifier: "identifier2", hasShow: false},
    });
});

test("Create Reducer", () => {
    const reducer = createReducer();

    const s1 = reducer({} as any, {type: "type", name: "@@framework/setState", payload: {module: "main", state: {a: 1, b: 2}}});
    expect(s1).toEqual({app: {main: {a: 1, b: 2}}, loading: {}});

    const s2 = reducer({} as any, {type: "@@framework/loading", payload: {identifier: "identifier", hasShow: true}});
    expect(s2).toEqual({app: {}, loading: {identifier: 1}});

    const s3 = reducer(s2, {type: "@@framework/loading", payload: {identifier: "identifier", hasShow: true}});
    expect(s3).toEqual({app: {}, loading: {identifier: 2}});

    const s4 = reducer(s3, {type: "@@framework/loading", payload: {identifier: "identifier", hasShow: false}});
    expect(s4).toEqual({app: {}, loading: {identifier: 1}});

    const reducer2 = createReducer(reducer => {
        return {
            ...reducer,
            router: (state = {}, action: any) => {
                if (action.type === "@@router") {
                    return action.payload;
                }
                return state;
            },
        };
    });

    const s5 = reducer2({app: {}, loading: {}, router: {}}, {type: "@@router", payload: {a: 1, b: 2}});
    expect(s5).toEqual({app: {}, loading: {}, router: {a: 1, b: 2}});
});
