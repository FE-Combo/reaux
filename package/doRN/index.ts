import {start, register, Model} from "./src/bootstrap";

export {Exception, APIException, ErrorListener, Async} from "../shared";

export {Lifecycle} from "./src/utils/decorator";

export {BaseStateView as State} from "../shared/type";

export {start, register, Model};

const Do = {
    start,
    register,
    Model,
};

export default Do;
