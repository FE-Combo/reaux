import Main from "./component/Main";
import { register } from "../../core";
const moduleName = "main";
const initState = {
  name: "main"
};
register(moduleName, initState);
export { Main };
