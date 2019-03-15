import {render, register} from "./core/boot";
import {Model} from "./core/mvc";
import {Exception, APIException, ErrorListener as ErrorListenerInCore} from "./core/exception";
import {Async} from "./component/Async";
import {Lifecycle} from "./util/decorator";

type ErrorListener = ErrorListenerInCore;

export {render, register, Async, Model, Exception, Lifecycle, APIException, ErrorListener};

const Do = {
    render,
    register,
};

export default Do;
