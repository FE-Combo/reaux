import {start, register, Model} from "./src/bootstrap";

export {Async, Exception, APIException, ErrorListener} from "../shared";

export {Lifecycle, Loading} from "./src/utils/decorator";

import Route from "./src/utils/Route";

export {start, register, Model, Route};

const Do = {
    start,
    register,
    Model,
};

export default Do;
