import {render, register} from "./core/boot";
import {Model} from "./core/mvc";
import {Exception, APIException, ErrorListener} from "./core/exception";
import {Async} from "./component/Async";

export {render, register, Async, Model, Exception, APIException, ErrorListener};

const Do = {
    render,
    register,
};

export default Do;
