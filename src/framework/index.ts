import {render, register} from "./core/App";
import {Handler} from "./core/redux";
import {Exception} from "./core/Exception";
import {async} from "./component/async";

export {render, register, async, Handler, Exception};

const Do = {
    render,
    register,
};

export default Do;
