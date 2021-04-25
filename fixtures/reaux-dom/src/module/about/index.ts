import {register, Model, useHelper} from "reaux-dom";
import {State} from "./type";
import Main from "./component/Main";

const helper = useHelper();
const initState: State = {
    name: "about",
};

class ActionHandler extends Model<State> {
    @helper.lifecycle()
    *onReady() {
        // TODO: promise暂时还不行
        console.log("about promise onReady");
    }

    *test() {
        this.setState({name: "new about"});
    }
}

export default register(new ActionHandler("about", initState), Main);
