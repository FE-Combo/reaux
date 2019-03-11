import Component from "./component/Main";
import {register, Handler} from "framework";
import {State} from "./type";
import {SagaIterator, Saga} from "redux-saga";

const initialState: State = {
    name: "string",
};

class ActionHandler extends Handler<State> {
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
export const {actions, Main} = register(new ActionHandler("home", initialState), Component);
