import {start, register, Model} from "./src/bootstrap";

export {Async, Exception, APIException} from "../shared";

export {Lifecycle, Loading} from "./src/utils/decorator";

import Route from "./src/utils/Route";

import {ErrorListener as ErrorListenerInCore} from "../shared";
import {Omit as OmitInCore, PickOptional as PickOptionalInCore} from "../shared";
type ErrorListener = ErrorListenerInCore;
type Omit<A, B extends keyof A> = OmitInCore<A, B>;
type PickOptional<A> = PickOptionalInCore<A>;

export {start, register, Model, Route, Omit, PickOptional, ErrorListener};

const Do = {
    start,
    register,
    Model,
};

export default Do;
