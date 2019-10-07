import Main from "./component/Main";
import { register } from "../../core";
const moduleName = "about";
const initState = {
  name: "about"
};
register(moduleName, initState);
export { Main };
