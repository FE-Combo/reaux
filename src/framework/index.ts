import {render, register} from "./core/Main";
import {Listener, LocationChangedEvent, Handler, Exception} from "./core/handler";
import {async} from "./components/async";
import {PickOptional} from "./utils/ts";

export type Listener = Listener;
export type LocationChangedEvent = LocationChangedEvent;
export {render, register, async, PickOptional, Handler, Exception};

const Do = {
    render,
    register,
};

export default Do;
