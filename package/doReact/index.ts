import start from "./boot/start";
import {Model, register} from "./boot/register";

import {Async} from "./component/Async";
import {isLoading} from "./component/Loading";

import {Exception, APIException, ErrorListener as ErrorListenerInCore} from "./util/exception";
import {Lifecycle, Loading} from "./util/decorator";

type ErrorListener = ErrorListenerInCore;

export {start, register, Async, Model, Exception, Lifecycle, APIException, ErrorListener, isLoading, Loading};

const Do = {
    start,
    register,
};

export default Do;
