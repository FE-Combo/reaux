import {setErrorAction} from "../../src/core/saga";

test("Set Error Action", () => {
    expect(setErrorAction(new Error())).toEqual({type: "@@framework/error", payload: new Error()});

    expect(setErrorAction("error")).toEqual({type: "@@framework/error", payload: "error"});
});
