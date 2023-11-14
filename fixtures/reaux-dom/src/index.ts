import {View} from "module/main";
import {start} from "reaux-dom";

start({
    Component: View, 
    fallback: function() {
        console.log(this)
        return "ErrorBoundary fallback"
    }
});
