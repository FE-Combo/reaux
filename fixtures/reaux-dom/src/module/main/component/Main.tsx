import React from "react";
import { Async } from "reaux";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const HomeView = Async(() => import(/* webpackChunkName: "home" */ "../../home"), "View");
const HomeDetailView = Async(() => import(/* webpackChunkName: "home" */ "../../home"), "View2");
const AboutView = Async(() => import(/* webpackChunkName: "about" */ "../../about"), "View");

class Main extends React.PureComponent {
    render() {
        return (
            <Router>
                <div>
                    <Link to="/home">Home</Link>
                    <Link to="/about">About</Link>
                </div>
                <Switch>
                    <Route exact path="/home" render={props =>  <HomeView {...props} />
                    } />
                    <Route exact path="/home/detail" render={props => <HomeDetailView {...props} />} />
                    <Route exact path="/about" render={props => <AboutView {...props} />} />
                </Switch>
            </Router>
    );
    }
}

export default Main;
