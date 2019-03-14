import {render} from "framework";
import {View} from "module/main";
import {ErrorHandlerModule} from "component/ErrorHandlerModule";
render({
    Component: View,
    onInitialized: null,
    // TODO:
    ErrorHandlerModule: ErrorHandlerModule as any,
});
