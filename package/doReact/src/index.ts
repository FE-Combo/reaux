import {start, register, Model} from "./bootstrap";

export {Async, Exception, APIException} from "../../shared/src/index";

export {Lifecycle, Loading} from "./utils/decorator";

import Route from "./utils/Route";

import {ErrorListener as ErrorListenerInCore} from "../../shared/src/index";
import {Omit as OmitInCore, PickOptional as PickOptionalInCore} from "../../shared/src/index";
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
