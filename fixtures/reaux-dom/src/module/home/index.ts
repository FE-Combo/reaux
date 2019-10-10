import Main from "./component/Main";
import {register, GModel} from "reaux-dom";
import {State} from "./type";
// import {SagaIterator} from "redux-saga";

const initState: State = {
    name: "home",
};

class ActionHandler extends GModel<State> {
    *test(): any {
        yield "1";
        yield "2";
        this.setState({name: "new Name"});
        return "3";
    }
}

export const {View, actions} = register(new ActionHandler("home", initState), Main);
