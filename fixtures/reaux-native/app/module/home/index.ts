import Component from "./component/Main";
import {register, Model} from "reaux-native";
import {State} from "./type";

const initialState = {
    name: "home",
};

class ActionHandler extends Model<State> {
    onReady() {
        console.log("module home");
    }

    onShow() {
        console.log("module home show");
    }

    onHide() {
        console.log("module home hidden");
    }

    test() {
        this.setState({name: "new home"});
    }
}
export const {actions, View} = register(new ActionHandler("home", initialState), Component);
