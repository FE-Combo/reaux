import Main from "./components/Main";
import {register, Handler, Listener} from "framework";
import {State} from "./type";
import {SagaIterator} from "redux-saga";

const initialState: State = {
    name: "string",
};

class ActionHandler extends Handler<State> implements Listener {
    *onInitialized(): SagaIterator {
        yield* this.setState({});
    }

    *test(): SagaIterator {
        yield* this.setState({name: "voco"});
    }
}
const actions = register(new ActionHandler("main", initialState));
export {actions, Main};
