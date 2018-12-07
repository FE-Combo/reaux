// If unable to use import() with magic comments
// Ref: https://github.com/airbnb/babel-plugin-dynamic-import-webpack/issues/34

import React from "react";
import {Switch} from "react-router-dom";
import Notfound from "./Notfound";
import Route from "../../../../core/component/Route";

class Component extends React.PureComponent {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/" />
                    <Route component={Notfound} />
                </Switch>
            </div>
        );
    }
}

export default Component;
