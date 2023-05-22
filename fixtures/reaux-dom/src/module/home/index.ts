import Main from "./component/Main";
import {register, Model} from "reaux-dom";
import Detail from "./component/Detail";
import {AllState} from "../../utils/state";
import {State} from "./type";

const initState: State = {
    name: "home",
};

class ActionHandler extends Model<State, AllState> {
    onReady() {
        console.info("home onReady");
    }
    test() {
        this.setState({name: "new Name"});
    }
}

export const {actions, View, proxyLifeCycle} = register(new ActionHandler("home", initState), Main);

export const View2 = proxyLifeCycle(Detail);
