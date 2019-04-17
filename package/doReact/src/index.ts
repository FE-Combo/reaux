import {start, register, Model} from "./bootstrap";

export {Async, Exception, APIException, ErrorListener} from "../../shared";

export {Lifecycle, Loading} from "./utils/decorator";

export {start, register, Model};

const Do = {
    start,
    register,
    Model,
};

export default Do;
