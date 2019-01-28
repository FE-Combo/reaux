import {render, register} from "./core/Main";
import {Listener, LocationChangedEvent, Handler, Exception} from "./core/handler";

export {render, register};
export {async} from "./components/async";
export {PickOptional} from "./utils/ts";

export type Listener = Listener;
export type LocationChangedEvent = LocationChangedEvent;
export {Handler};
export {Exception};

const Do = {
    render,
    register,
};

export default Do;
