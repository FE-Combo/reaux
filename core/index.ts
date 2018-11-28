import {render, register} from "./Main";
export {Listener, LocationChangedEvent, Handler, Exception} from "./handler";
export {render, register};
export {async} from "./component/async";
export {PickOptional} from "./util/ts";

const dodoing = {
    render,
    register,
};

export default dodoing;
