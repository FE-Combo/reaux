import {setStateAction, setHelperLoadingAction, setHelperLanguageAction, setHelperExceptionAction} from "../../src/core/utils";
import {Exception} from "../../src/type";

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
    expect(setHelperLoadingAction("identifier", true)).toEqual({
        type: "@@framework/setHelper/loading",
        payload: {identifier: "identifier", hasShow: true},
    });

    expect(setHelperLoadingAction("identifier2", false)).toEqual({
        type: "@@framework/setHelper/loading",
        payload: {identifier: "identifier2", hasShow: false},
    });
});

test("Set Language In Helper", () => {
    expect(setHelperLanguageAction("CN")).toEqual({
        type: "@@framework/setHelper/language",
        payload: "CN",
    });

    expect(setHelperLanguageAction("EN")).toEqual({
        type: "@@framework/setHelper/language",
        payload: "EN",
    });
});

test("Set Exception In Helper", () => {
    expect(setHelperExceptionAction({} as Exception)).toEqual({
        type: "@@framework/setHelper/exception",
        payload: {},
    });
});
