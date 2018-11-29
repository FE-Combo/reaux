import Main from "./component/Main";
import {register, Handler} from "../../../core";
import {State} from "./type";
import {SagaIterator} from "redux-saga";

const initialState: State = {
    name: "",
};

class ActionHandler extends Handler<State> {
    *test(): SagaIterator {
        yield* this.setState({name: "voco"});
    }
}
const actions = register(new ActionHandler("main", initialState));
export {actions, Main};
