import Main from "./component/Main";
import {register, Model} from "reaux-dom";
import {State} from "./type";

const initState: State = {
    name: "about",
};

class ActionHandler extends Model<State> {
    async onReady() {
        console.info("about onReady");
    }

    async test() {
        this.setState({name: "new about"});
    }
}

export const {actions, View} = register(new ActionHandler("about", initState), Main);
