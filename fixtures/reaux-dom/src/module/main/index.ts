import Main from "./component/Main";
import {register, GModel, helper} from "reaux-dom";
import {State} from "./type";

const initState: State = {
    name: "main",
};

class ActionHandler extends GModel<State> {
    @helper.lifecycle()
    onReady(): any {
        console.log("common onReady");
    }
}

const module = register(new ActionHandler("main", initState));
export const actions = module.actions;
export const View = module.proxyView(Main);
