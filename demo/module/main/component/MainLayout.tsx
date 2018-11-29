import React from "react";
import {Route, Switch} from "react-router-dom";
import Notfound from "./Notfound";

class Component extends React.PureComponent {
    render() {
        return (
            <Switch>
                <Route exact path="/" />
                <Route exact component={Notfound} />
            </Switch>
        );
    }
}

export default Component;
