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

export const {actions, View} = register(new ActionHandler("main", initState), Main);
