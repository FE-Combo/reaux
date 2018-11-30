import {render, register} from "./Main";
import {Listener, LocationChangedEvent, Handler, Exception} from "./handler";

export {render, register};
export {async} from "./component/async";
export {PickOptional} from "./util/ts";

export type Listener = Listener;
export type LocationChangedEvent = LocationChangedEvent;
export {Handler};
export {Exception};

const Do = {
    render,
    register,
};

export default Do;
