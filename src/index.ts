/* React part */
import {render, register} from "./react/Main";
export {Listener, LocationChangedEvent, Handler, Exception} from "./react/handler";
export {render, register};
export {async} from "./react/component/async";

const dodoing = {
    render,
    register,
};

export default dodoing;
