import {register, Model} from "framework";
import {SagaIterator} from "redux-saga";
import {State} from "./type";
import {2} from "./component/Main";

const initialState: State = {};

class {3} extends Model<State> {
    *onReady(): SagaIterator {
        // TODO
    }
}

export const {Controller, View} = register(new {3}("{1}", initialState), {2});
