import Component from "./component/Main";
import {register, Model, Lifecycle, Loading} from "framework";
import {State} from "./type";
import {SagaIterator} from "redux-saga";
import {delay} from "redux-saga/effects";

const initialState: State = {
    name: "string",
};

class ActionHandler extends Model<State> {
    @Lifecycle()
    @Loading()
    *onLoad(): SagaIterator {
        yield delay(2000, {});
    }

    *onInitialized(): SagaIterator {
        yield* this.setState({});
    }

    *test(): SagaIterator {
        yield* this.setState({name: "voco"});
    }
}
export const {Controller, View} = register(new ActionHandler("main", initialState), Component);
