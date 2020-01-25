import {createReducer, createModuleReducer} from "../../src/core/createReducer";
import {createActionType, setModuleAction} from "../../src/core/shared";

test("Create Module Reducer", () => {
    const reducer1 = createModuleReducer("namespace1");
    const state = reducer1({}, setModuleAction("namespace1", {a: 1, b: 1}));
    expect(state).toEqual({a: 1, b: 1});

    const state2 = reducer1({}, setModuleAction("namespace2", {a: 1, b: 1}));
    expect(state2).toEqual({});

    const state3 = reducer1({a: 1}, setModuleAction("namespace3", {a: 1, b: 1}));
    expect(state3).toEqual({a: 1});
});

test("Create Reducer", () => {
    const reducer = createReducer();

    const s1 = reducer({} as any, {type: createActionType("@loading"), payload: {global: 0}});
    expect(s1).toEqual({"@error": {}, "@loading": {global: 0}});

    const s2 = reducer({} as any, {type: createActionType("@loading"), payload: {button: 0}});
    expect(s2).toEqual({"@error": {}, "@loading": {button: 0}});

    const s3 = reducer(s2, {type: createActionType("@error"), payload: {runtimeException: {}}});
    expect(s3).toEqual({"@error": {runtimeException: {}}, "@loading": {button: 0}});

    const reducer2 = createReducer({home: createModuleReducer("home")} as any);

    const s4 = reducer2({home: {}, "@error": {} as any, "@loading": {}}, {type: createActionType("home"), payload: {a: 1, b: 2}});
    expect(s4).toEqual({home: {a: 1, b: 2}, "@error": {}, "@loading": {}});
});
