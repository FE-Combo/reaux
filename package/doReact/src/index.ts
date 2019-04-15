import {start, register, Model} from "./bootstrap";

import {Async} from "../../shared/component/Async";

import {Exception, APIException, ErrorListener as ErrorListenerInCore} from "../../shared/util/exception";
import {Lifecycle, Loading} from "../../shared/util/decorator";

type ErrorListener = ErrorListenerInCore;

export {start, register, Async, Model, Exception, Lifecycle, APIException, ErrorListener, Loading};

const Do = {
    start,
    register,
};

export default Do;
