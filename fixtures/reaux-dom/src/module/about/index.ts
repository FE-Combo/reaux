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

export const {View, actions} = register(new ActionHandler("about", initState), Main);
