import Main from "./component/Main";
import {register, GModel, helper} from "reaux-dom";
import {State} from "./type";

const initState: State = {
    name: "main",
};

class ActionHandler extends GModel<State> {
    @helper.lifecycle()
    *onReady(): any {
        this.setState({name: "new main"});
        console.log("common onReady");
    }
}

const module = register(new ActionHandler("main", initState));
export const actions = module.actions;
export const View = module.proxyView(Main);
