import Component from "./component/Main";
import {register, Handler} from "framework";
import {State} from "./type";
import {SagaIterator} from "redux-saga";

const initialState: State = {
    name: "string",
};

class ActionHandler extends Handler<State> {
    *main(): SagaIterator {
        //
    }

    *onInitialized(): SagaIterator {
        yield* this.setState({});
    }

    *test(): SagaIterator {
        yield* this.setState({name: "voco"});
    }
}
export const {getActions, Main} = register(new ActionHandler("main", initialState), Component);
