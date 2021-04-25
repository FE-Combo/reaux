import {register, Model, useHelper} from "reaux-dom";
import {State} from "./type";
import Main from "./component/Main";

const helper = useHelper();
const initState: State = {
    name: "home",
};

class ActionHandler extends Model<State> {
    @helper.lifecycle()
    *onReady(): any {
        console.log("home generator onReady");
    }
    *test(): any {
        yield "1";
        yield "2";
        this.setState({name: "new Name"});
        return "3";
    }
}

export default register(new ActionHandler("home", initState), Main);
