import {APIException, RuntimeException, ReactLifecycleException, NetworkConnectionException} from "../../src/core/exception";

describe("Exception", () => {
    test("APIException", () => {
        const error = new APIException("server error", 500, "/api/test", {msg: "error"});
        expect(error.message).toBe("server error");
        expect(error.statusCode).toBe(500);
        expect(error.requestURL).toBe("/api/test");
        expect(error.responseData).toEqual({msg: "error"});
    });

    test("RuntimeException", () => {
        const originalError = new Error("original");
        const error = new RuntimeException("runtime error", originalError);
        expect(error.message).toBe("runtime error");
        expect(error.error).toBe(originalError);

        const error2 = new RuntimeException("runtime error 2");
        expect(error2.message).toBe("runtime error 2");
        expect(error2.error).toBeNull();
    });

    test("ReactLifecycleException", () => {
        const error = new ReactLifecycleException("render error", "component stack");
        expect(error.message).toBe("render error");
        expect(error.componentStack).toBe("component stack");
    });

    test("NetworkConnectionException", () => {
        const error = new NetworkConnectionException("http://example.com");
        expect(error.message).toBe("failed to connect to http://example.com");
    });
});
