import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {View as AboutView} from "../../about";
import {View as HomeView} from "../..//home";

class Main extends React.PureComponent {
    render() {
        return (
            <div>
                <div>
                    <a onClick={() => (location.href = "/home")}>Home</a>
                    <a onClick={() => (location.href = "/about")}>About</a>
                </div>
                <Router>
                    <Switch>
                        <Route exact path="/home" render={props => <HomeView {...props} />} />
                        <Route exact path="/about" render={props => <AboutView {...props} />} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Main;
