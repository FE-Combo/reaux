import {render, register} from "./core/boot";
import {Model} from "./core/mvc";
import {Exception, APIException, ErrorListener as ErrorListenerInCore} from "./core/exception";
import {Async} from "./component/Async";
import {Lifecycle, Loading} from "./util/decorator";
import {isLoading} from "./core/redux";

type ErrorListener = ErrorListenerInCore;

export {render, register, Async, Model, Exception, Lifecycle, APIException, ErrorListener, isLoading, Loading};

const Do = {
    render,
    register,
};

export default Do;
