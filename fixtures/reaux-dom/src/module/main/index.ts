import Main from "./component/Main";
import {register, Model, useHelper} from "reaux-dom";
import {State} from "./type";

const helper = useHelper();
const initState: State = {
    name: "main",
};
class ActionHandler extends Model<State> {
    @helper.lifecycle()
    *onReady(): any {
        this.setState({name: "new main"});
        console.log("common onReady");
    }
}

export default register(new ActionHandler("main", initState), Main);
