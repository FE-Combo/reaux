import Main from "./component/Main";
import {register, Model, helper} from "reaux-dom";
import Detail from "./component/Detail";
import {AllState} from "../../utils/state";
import {State} from "./type";

const initialState: State = {
    name: "home",
};

class ActionHandler extends Model<State, AllState> {
    onReady() {
        console.info("home onReady");
    }

    onLoad(): void {
        console.log("home onLoad");
    }

    @helper.interval(3)
    onTick() {
        console.log("home onTick");
    }

    test() {
        this.router.push("/home/detail");
    }
}

export const {actions, View, proxyLifeCycle} = register(new ActionHandler("home", initialState), Main);

export const View2 = proxyLifeCycle(Detail);
