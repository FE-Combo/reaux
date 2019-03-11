import Component from "./component/Main";
import {register, Handler} from "framework";
import {State} from "./type";
import {SagaIterator} from "redux-saga";

const initialState: State = {
    name: "string",
};

class ActionHandler extends Handler<State> {
    *about(): SagaIterator {
        //
    }
    *onInitialized(): SagaIterator {
        yield* this.setState({});
    }

    *test(): SagaIterator {
        yield* this.setState({name: "voco"});
    }
}
export const {actions, Main} = register(new ActionHandler("about", initialState), Component);
