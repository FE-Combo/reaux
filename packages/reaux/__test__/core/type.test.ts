import {Exception} from "../../src/type";

test("type", () => {
    class MyException extends Exception {
        constructor(public message: string) {
            super(message);
        }
    }
    const test = new MyException("exception");
    expect(test).toBeInstanceOf(Exception);
});
