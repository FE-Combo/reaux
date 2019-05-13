import {start, register, Model} from "./platform/boot";

export {Async, Exception, APIException, call} from "./shared";

export {Lifecycle, Loading} from "./platform/decorator";

export {ajax} from "./platform/ajax";

import Route from "./platform/Route";

import {ErrorListener as ErrorListenerInCore} from "./shared";
export type ErrorListener = ErrorListenerInCore;

export {start, register, Model, Route};

const Do = {
    start,
    register,
    Model,
};

export default Do;
