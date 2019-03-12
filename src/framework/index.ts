import {render, register} from "./core/start";
import {Model} from "./core/mvc";
import {Exception} from "./core/exception";
import {Async} from "./component/Async";

export {render, register, Async, Model, Exception};

const Do = {
    render,
    register,
};

export default Do;
