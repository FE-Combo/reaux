import Main from "./component/Main";
import {register, Model} from "reaux-dom";
import {connect} from "react-redux";
import {State} from "./type";
import {AllState} from "utils/state";
import {ObserverInstanceCallback} from "react-intersection-observer";

const initState: State = {
    name: "about",
};

class ActionHandler extends Model<State, AllState> {
    async onReady() {
        console.info("about onReady");
        // this.setState({name: "new about"+new Date().getTime()}); // 无法更新onUpdate
    }

    onShow(entry: Parameters<ObserverInstanceCallback>[1]) {
        console.log("about onShow", entry);
    }

    onHide(entry: Parameters<ObserverInstanceCallback>[1]) {
        console.log("about onHide", entry);
    }

    onUpdate(): void {
        console.log("about onUpdate");
    }

    onUnload(): void {
        console.log("about onUnload");
    }

    async test() {
        this.setState({name: "new about" + new Date().getTime(), test: "test"});
    }

    async reset() {
        this.resetState();
    }
}

const {actions, View: PreView} = register(new ActionHandler("about", initState), Main);

const View = connect((state: AllState) => ({about: state.about}))(PreView);

export {actions, View};
