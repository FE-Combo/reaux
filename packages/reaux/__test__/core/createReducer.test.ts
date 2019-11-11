import {createReducer, setStateAction, setLoadingHelperAction, setLangHelperAction} from "../../src/core/createReducer";

test("Set State Action", () => {
    expect(setStateAction("moduleName", {name: "name", age: 11})).toEqual({
        type: "@@framework/setState",
        payload: {module: "moduleName", state: {name: "name", age: 11}},
    });

    expect(setStateAction("moduleName2", {name: "name2", age: 22})).toEqual({
        type: "@@framework/setState",
        payload: {module: "moduleName2", state: {name: "name2", age: 22}},
    });
});

test("Set Loading In Helper", () => {
    expect(setLoadingHelperAction("identifier", true)).toEqual({
        type: "@@framework/setHelper/loading",
        payload: {identifier: "identifier", hasShow: true},
    });

    expect(setLoadingHelperAction("identifier2", false)).toEqual({
        type: "@@framework/setHelper/loading",
        payload: {identifier: "identifier2", hasShow: false},
    });
});

test("Set Lang In Helper", () => {
    expect(setLangHelperAction("CN")).toEqual({
        type: "@@framework/setHelper/lang",
        payload: "CN",
    });

    expect(setLangHelperAction("EN")).toEqual({
        type: "@@framework/setHelper/lang",
        payload: "EN",
    });
});

test("Create Reducer", () => {
    const reducer = createReducer();

    const s1 = reducer({} as any, {name: "name", type: "@@framework/setState", payload: {module: "main", state: {a: 1, b: 2}}});
    expect(s1).toEqual({app: {main: {a: 1, b: 2}}, helper: {}});

    const s2 = reducer({} as any, {type: "@@framework/setHelper/loading", payload: {identifier: "identifier", hasShow: true}});
    expect(s2).toEqual({app: {}, helper: {loading: {identifier: 1}}});

    const s3 = reducer(s2, {type: "@@framework/setHelper/loading", payload: {identifier: "identifier", hasShow: true}});
    expect(s3).toEqual({app: {}, helper: {loading: {identifier: 2}}});

    const s4 = reducer(s3, {type: "@@framework/setHelper/loading", payload: {identifier: "identifier", hasShow: false}});
    expect(s4).toEqual({app: {}, helper: {loading: {identifier: 1}}});

    const reducer2 = createReducer<any>(reducer => {
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

    const s5 = reducer2({app: {}, helper: {}, router: {}}, {type: "@@router", payload: {a: 1, b: 2}});
    expect(s5).toEqual({app: {}, helper: {}, router: {a: 1, b: 2}});
});
