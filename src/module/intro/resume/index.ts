import Component from "./component/Main";
import {register, Model} from "framework";
import {State} from "./type";
import {SagaIterator} from "redux-saga";

const initialState: State = {
    name: "string",
};

class ActionHandler extends Model<State> {
    *resume(): SagaIterator {
        //
    }

    *onInitialized(): SagaIterator {
        yield* this.setState({});
    }

    *test(): SagaIterator {
        yield* this.setState({name: "voco"});
    }
}
export const {Controller, View} = register(new ActionHandler("resume", initialState), Component);
