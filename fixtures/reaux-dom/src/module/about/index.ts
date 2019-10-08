import Main from "./component/Main";
import {register, GModel} from "reaux-dom";
import {State} from "./type";

const initState: State = {
    name: "about",
};

class ActionHandler extends GModel<State> {}

export const {View, actions} = register(new ActionHandler("about", initState), Main);
