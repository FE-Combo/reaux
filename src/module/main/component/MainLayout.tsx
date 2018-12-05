// If unable to use import() with magic comments
// Ref: https://github.com/airbnb/babel-plugin-dynamic-import-webpack/issues/34

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
