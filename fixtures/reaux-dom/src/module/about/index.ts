import Main from "./component/Main";
import {register, Model, connect} from "reaux-dom";
import {State} from "./type";
import {AllState} from "utils/state";
import {ObserverInstanceCallback} from "react-intersection-observer";

const initialState: State = {
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

    onUpdate(...args: any[]): void {
        console.log("about onUpdate", args);
    }

    onUnload(): void {
        console.log("about onUnload");
    }

    async test() {
        this.router.push("/home");
    }
}

const {actions, View} = connect((state: AllState) => ({name: state.about.name}))(register(new ActionHandler("about", initialState), Main));

export {actions, View};
