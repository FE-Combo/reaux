import Main from "./component/Main";
import {register, Model} from "reaux-dom";

const initState = {
    name: "home",
};
class HomeModel extends Model {}

const handler = new HomeModel("home", initState);
const {View, actions} = register(handler, Main);
export {View, actions};
