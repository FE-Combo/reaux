import Main from "./component/Main";
import { register } from "../../core";
const moduleName = "home";
const initState = {
  name: "home"
};
register(moduleName, initState);
export { Main };
