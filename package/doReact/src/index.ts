import start from "./start";
import {Model, register} from "./register";

import {Async} from "../../shared/component/Async";
import {isLoading} from "../../shared/component/Loading";

import {Exception, APIException, ErrorListener as ErrorListenerInCore} from "../../shared/util/exception";
import {Lifecycle, Loading} from "../../shared/util/decorator";

type ErrorListener = ErrorListenerInCore;

export {start, register, Async, Model, Exception, Lifecycle, APIException, ErrorListener, isLoading, Loading};

const Do = {
    start,
    register,
};

export default Do;
