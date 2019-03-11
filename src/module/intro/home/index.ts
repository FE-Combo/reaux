import Component from "./component/Main";
import {register, Model} from "framework";
import {State} from "./type";
import {SagaIterator} from "redux-saga";

const initialState: State = {
    name: "string",
};

class ActionHandler extends Model<State> {
    *onLoad(): SagaIterator {
        //
    }

    *home(): SagaIterator {
        //
    }
    *pushHistory(url: string): SagaIterator {
        yield* this.setHistory("/");
    }

    *test(): SagaIterator {
        yield* this.setState({name: "voco"});
    }
}
export const {Controller, View} = register(new ActionHandler("home", initialState), Component);
