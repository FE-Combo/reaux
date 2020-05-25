import Main from "./component/Main";
import {register, GModel} from "reaux-dom";
import Detail from "./component/Detail";
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

const module = register(new ActionHandler("home", initState));

export const actions = module.getActions();
export const View = module.attachView(Main);
export const View2 = module.attachView(Detail);
