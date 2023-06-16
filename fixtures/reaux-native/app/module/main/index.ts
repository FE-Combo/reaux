import Component from "./component/Main";
import {register, Model, helper} from "reaux-native";
import {State} from "./type";

const initialState = {
    name: "main",
};

class ActionHandler extends Model<State> {
    onReady() {
        console.log("module main");
    }

    @helper.interval(3)
    onTick(): void {
        console.log("main onTick");
    }

    test() {
        this.setState({name: "new main"});
    }
}
export const {actions, View} = register(new ActionHandler("main", initialState), Component);
