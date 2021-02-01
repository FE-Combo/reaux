import {url} from "../../src/core/axios";

test.only("test url", () => {
    expect(url("/api/test")).toBe("/api/test");
    expect(url("/api/test", {a: 1, b: 2})).toBe("/api/test");
    expect(url("/api/test/:a/:b", {a: 1, b: 2})).toBe("/api/test/1/2");
});
