import Main from "./component/Main";
import {register, Model} from "reaux-dom";
import {State} from "./type";

const initState: State = {
    name: "main",
};

class ActionHandler extends Model<State> {
    onReady() {
        console.info("main onReady");
    }
}

const module = register(new ActionHandler("main", initState));
export const actions = module.actions;
export const View = module.proxyView(Main);
