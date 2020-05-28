import Main from "./component/Main";
import {register, PModel, helper} from "reaux-dom";
import {State} from "./type";

const initState: State = {
    name: "about",
};

class ActionHandler extends PModel<State> {
    @helper.lifecycle()
    async onReady() {
        console.log("promise onReady");
    }

    async test() {
        this.setState({name: "new about"});
    }
}

const {actions, proxyView} = register(new ActionHandler("about", initState));
const View = proxyView(Main);
export {actions, View};
