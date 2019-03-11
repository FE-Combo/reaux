import {render, register} from "./core/App";
import {Model} from "./core/redux";
import {Exception} from "./core/Exception";
import {Async} from "./component/Async";

export {render, register, Async, Model, Exception};

const Do = {
    render,
    register,
};

export default Do;
