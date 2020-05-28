import Main from "./component/Main";
import {register, GModel, helper} from "reaux-dom";
import Detail from "./component/Detail";
import {State} from "./type";
// import {SagaIterator} from "redux-saga";

const initState: State = {
    name: "home",
};

class ActionHandler extends GModel<State> {
    @helper.lifecycle()
    *onReady(): any {
        console.log("generator onReady");
    }
    *test(): any {
        yield "1";
        yield "2";
        this.setState({name: "new Name"});
        return "3";
    }
}

const module = register(new ActionHandler("home", initState));

export const actions = module.actions;
export const View = module.proxyView(Main);
export const View2 = module.proxyView(Detail);
