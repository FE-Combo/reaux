import Main from "./component/Main";
import {register, PModel} from "reaux-dom";
import {State} from "./type";

const initState: State = {
    name: "about",
};

class ActionHandler extends PModel<State> {
    async test() {
        this.setState({name: "new about"});
    }
}

const module = register(new ActionHandler("main", initState));
export const actions = module.getActions();
export const View = module.attachView(Main);
