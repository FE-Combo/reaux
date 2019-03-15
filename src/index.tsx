import {render} from "framework";
import {View} from "module/main";
import ErrorHandlerModule from "component/ErrorHandlerModule";
render({
    ErrorHandlerModule,
    Component: View,
    onInitialized: () => document.getElementById("startup")!.remove(),
});
