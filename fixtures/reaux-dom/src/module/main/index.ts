import Main from "./component/Main";
import {register, Model, helper} from "reaux-dom";
import {AllState} from "../../utils/state";
import {State} from "./type";

const initialState: State = {
    name: "main",
};

class ActionHandler extends Model<State, AllState> {
    @helper.loading()
    onReady() {
        console.info("main onReady");
    }
}

export const {actions, View} = register(new ActionHandler("main", initialState), Main);
