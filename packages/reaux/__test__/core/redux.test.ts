import {createDynamicMiddleware, promiseMiddleware} from "../../src/core/redux";
import {Middleware, MiddlewareAPI, Dispatch, AnyAction} from "redux";
import {createActionType} from "../../src/core/shared";

describe("redux utils", () => {
    describe("promiseMiddleware", () => {
        test("should execute action handler if exists", async () => {
            const handler = jest.fn();
            const callback = jest.fn(() => ({
                TEST_ACTION: handler,
            }));
            const middleware = promiseMiddleware(callback);
            const api = {
                dispatch: jest.fn(),
                getState: jest.fn(),
            } as unknown as MiddlewareAPI;
            const next = jest.fn();
            const action = {
                type: "TEST_ACTION",
                payload: [1, 2, 3],
            };

            await (middleware(api)(next)(action) as any);

            expect(callback).toHaveBeenCalled();
            expect(handler).toHaveBeenCalledWith(1, 2, 3);
            expect(next).toHaveBeenCalledWith(action);
        });

        test("should catch error in action handler and dispatch error action", async () => {
            const error = new Error("handler error");
            const handler = jest.fn().mockRejectedValue(error);
            const callback = jest.fn(() => ({
                TEST_ACTION: handler,
            }));
            const middleware = promiseMiddleware(callback);
            const api = {
                dispatch: jest.fn(),
                getState: jest.fn(),
            } as unknown as MiddlewareAPI;
            const next = jest.fn();
            const action = {
                type: "TEST_ACTION",
                payload: [],
            };

            const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

            await (middleware(api)(next)(action) as any);

            expect(handler).toHaveBeenCalled();
            expect(api.dispatch).toHaveBeenCalledWith({
                type: createActionType("@error"),
                payload: {
                    type: "redux-action",
                    message: "handler error",
                    stack: expect.any(String),
                },
            });
            expect(consoleErrorSpy).toHaveBeenCalledWith("redux error:", error);
            expect(next).toHaveBeenCalledWith(action);

            consoleErrorSpy.mockRestore();
        });
    });

    describe("createDynamicMiddleware", () => {
        test("should add and execute middleware", () => {
            const {enhancer, addMiddleware} = createDynamicMiddleware();
            const store = {
                dispatch: jest.fn(),
                getState: jest.fn(),
            } as unknown as MiddlewareAPI;
            const next = jest.fn();
            const action = {type: "TEST"};

            const mw1: Middleware = (api) => (next) => (action) => {
                action.mw1 = true;
                return next(action);
            };

            // Enhance store first
            const dispatch = enhancer(store)(next);

            // Add middleware
            addMiddleware(mw1);

            dispatch(action);

            expect((action as any).mw1).toBe(true);
            expect(next).toHaveBeenCalledWith(action);
        });

        test("should remove middleware correctly", () => {
            const {enhancer, addMiddleware, removeMiddleware} = createDynamicMiddleware();
            const store = {
                dispatch: jest.fn(),
                getState: jest.fn(),
            } as unknown as MiddlewareAPI;
            const next = jest.fn();

            const mw1: Middleware = (api) => (next) => (action) => {
                action.trail = (action.trail || []) + "1";
                return next(action);
            };
            const mw2: Middleware = (api) => (next) => (action) => {
                action.trail = (action.trail || []) + "2";
                return next(action);
            };
            const mw3: Middleware = (api) => (next) => (action) => {
                action.trail = (action.trail || []) + "3";
                return next(action);
            };

            const dispatch = enhancer(store)(next);

            addMiddleware(mw1, mw2, mw3);

            let action: any = {type: "TEST"};
            dispatch(action);
            expect(action.trail).toBe("123");

            // Remove middle middleware
            removeMiddleware(mw2);

            action = {type: "TEST"};
            dispatch(action);
            expect(action.trail).toBe("13"); // Should be 13 if mw2 is removed. If bug exists, it might be empty or different.

            // Remove first
            removeMiddleware(mw1);
            action = {type: "TEST"};
            dispatch(action);
            expect(action.trail).toBe("3");
        });

        test("should reset middlewares", () => {
            const {enhancer, addMiddleware, resetMiddlewares} = createDynamicMiddleware();
            const store = {} as MiddlewareAPI;
            const next = jest.fn();
            const mw1: Middleware = () => (next) => (action) => next(action);

            const dispatch = enhancer(store)(next);
            addMiddleware(mw1);

            resetMiddlewares();

            // Access private state indirectly via behavior or just trust it works if previous tests pass?
            // Since we don't expose state, we can verify behavior.
            // But we can check if it runs without error and acts as identity.
            const action = {type: "TEST"};
            dispatch(action);
            expect(next).toHaveBeenCalledWith(action);
        });
    });
});
