import React from "react";
import { Async } from "reaux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const HomeView = Async(() => import(/* webpackChunkName: "home" */ "../../home"), "View");
const HomeDetailView = Async(() => import(/* webpackChunkName: "home" */ "../../home"), "View2");
const AboutView = Async(() => import(/* webpackChunkName: "about" */ "../../about"), "View");

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
                        <Route exact path="/home/detail" render={props => <HomeDetailView {...props} />} />
                        <Route exact path="/about" render={props => <AboutView {...props} />} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Main;
