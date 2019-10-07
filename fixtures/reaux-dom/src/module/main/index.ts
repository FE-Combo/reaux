import Main from "./component/Main";
import {register, Model} from "reaux-dom";

const initState = {
    name: "main",
};
class MainModel extends Model {}

const handler = new MainModel("main", initState);
const {View, actions} = register(handler, Main);
export {View, actions};
