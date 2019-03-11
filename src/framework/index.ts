import {render, register} from "./core/App";
import {Handler} from "./core/redux";
import {Exception} from "./core/Exception";
import {Async} from "./component/async";

export {render, register, Async, Handler, Exception};

const Do = {
    render,
    register,
};

export default Do;
