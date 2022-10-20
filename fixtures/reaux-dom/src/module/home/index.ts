import Main from "./component/Main";
import {register, Model} from "reaux-dom";
import Detail from "./component/Detail";
import {State} from "./type";

const initState: State = {
    name: "home",
};

class ActionHandler extends Model<State> {
    onReady() {
        console.info("home onReady");
    }
    test() {
        this.setState({name: "new Name"});
    }
}

const module = register(new ActionHandler("home", initState));

export const actions = module.actions;
export const View = module.proxyView(Main);
export const View2 = module.proxyView(Detail);
