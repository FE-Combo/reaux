import Main from "./component/Main";
import {register, GModel} from "reaux-dom";
import {State} from "./type";

const initState: State = {
    name: "main",
};

class ActionHandler extends GModel<State> {}

const module = register(new ActionHandler("main", initState));
export const actions = module.getActions();
export const View = module.attachView(Main);
