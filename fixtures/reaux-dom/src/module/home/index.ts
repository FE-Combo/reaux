import Main from "./component/Main";
import {register, GModel} from "reaux-dom";
import {State} from "./type";
import {SagaIterator} from "redux-saga";

const initState: State = {
    name: "home",
};

class ActionHandler extends GModel<State> {
    *test(): SagaIterator {
        this.setState({name: "new Name"});
    }
}

export const {View, actions} = register(new ActionHandler("home", initState), Main);
