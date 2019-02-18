// Why unable to use import() with magic comments
// Ref: https://github.com/airbnb/babel-plugin-dynamic-import-webpack/issues/34

import React from "react";
import {Switch} from "react-router-dom";
import Notfound from "./Notfound";
import Route from "framework/components/Route";
import {async} from "framework/components/async";

/** common */
const Header = async(() => import(/* webpackChunkName:"header" */ "common/header"), "Main");
const Footer = async(() => import(/* webpackChunkName:"footer" */ "common/footer"), "Main");

/** module */
const Home = async(() => import(/* webpackChunkName: "home" */ "module/home"), "Main");
const Notes = async(() => import(/* webpackChunkName:"notes" */ "module/notes"), "Main");
const About = async(() => import(/* webpackChunkName: "about" */ "module/about"), "Main");
const Resume = async(() => import(/* webpackChunkName: "resume" */ "module/resume"), "Main");

class Component extends React.PureComponent {
    render() {
        return (
            <div className="layout">
                {/* TODO: IE浏览器不支持 <main> */}
                <main>
                    <Switch>
                        <Route path="/" component={Home} />
                        <Route path="/notes" component={Notes} />
                        <Route path="/about" component={About} />
                        <Route path="/resume" component={Resume} />
                        <Route component={Notfound} />
                    </Switch>
                </main>
                <Footer />
            </div>
        );
    }
}

export default Component;
