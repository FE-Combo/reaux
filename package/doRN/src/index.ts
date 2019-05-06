import {start, register, Model} from "./bootstrap";

export {Exception, APIException, ErrorListener, Async} from "../../shared/src/index";

export {Lifecycle} from "./utils/decorator";

export {BaseStateView as State} from "../../shared/src/type";

export {start, register, Model};

const Do = {
    start,
    register,
    Model,
};

export default Do;
