import Main from "./component/Main";
import {register, Model} from "reaux-dom";

const initState = {
    name: "about",
};
class AboutModel extends Model {}

const handler = new AboutModel("about", initState);
const {View, actions} = register(handler, Main);
export {View, actions};
