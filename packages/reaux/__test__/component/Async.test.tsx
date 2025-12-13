import React from "react";
import {create as render, act} from "react-test-renderer";
import {Async} from "../../src/component/Async";

describe("Async", () => {
    test("should render component after resolve", async () => {
        const TestComponent = () => <div>Loaded</div>;
        let resolvePromise: (value: any) => void;
        const promise = new Promise((resolve) => {
            resolvePromise = resolve;
        });

        // Mock resolve function passed to Async
        const resolveFn = () => promise as Promise<any>;

        const AsyncComponent = Async(resolveFn, "default", <div>Loading</div>);

        let component: any;
        // Initial render
        await act(async () => {
            component = render(<AsyncComponent />);
        });

        // Should be loading
        expect(component.toJSON()).toMatchSnapshot("loading");

        // Resolve promise
        await act(async () => {
            resolvePromise!({default: TestComponent});
            // We need to wait for the promise chain in componentDidMount to resolve
            await promise;
        });

        // Should be loaded
        expect(component.toJSON()).toMatchSnapshot("loaded");
    });
});
