import {render, register} from "./core/boot";
import {Model} from "./core/mvc";
import {Exception, APIException, ErrorListener} from "./core/exception";
import {Async} from "./component/Async";
import {Lifecycle} from "./util/decorator";

export {render, register, Async, Model, Exception, Lifecycle, APIException, ErrorListener};

const Do = {
    render,
    register,
};

export default Do;
