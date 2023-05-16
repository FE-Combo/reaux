import Main from "./component/Main";
import {register, Model} from "reaux-dom";
import {connect} from "react-redux";
import {State} from "./type";
import {AllState} from "utils/state";

const initState: State = {
    name: "about",
};

class ActionHandler extends Model<State> {
    async onReady() {
        console.info("about onReady");
        // this.setState({name: "new about"+new Date().getTime()}); // 无法更新onUpdate
    }

    onUpdate(): void {
        console.log("about onUpdate");
    }

    onUnload(): void {
        console.log("about onUnload");
    }

    async test() {
        this.setState({name: "new about" + new Date().getTime()});
    }
}

const {actions, View: PreView} = register(new ActionHandler("about", initState), Main);

const View = connect((state: AllState) => ({about: state.about}))(PreView);

export {actions, View};
