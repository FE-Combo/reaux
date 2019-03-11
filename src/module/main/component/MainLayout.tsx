// Why unable to use import() with magic comments
// Ref: https://github.com/airbnb/babel-plugin-dynamic-import-webpack/issues/34

import React from "react";
import {Switch} from "react-router-dom";
import Notfound from "./Notfound";
import Route from "framework/component/Route";
import {async} from "framework/component/async";

/** common */
const Header = async(() => import(/* webpackChunkName:"header" */ "module/common/header"), "Main");
const Footer = async(() => import(/* webpackChunkName:"footer" */ "module/common/footer"), "Main");
const IntroHome = async(() => import(/* webpackChunkName: "IntroHome" */ "module/intro/home"), "Main");
const IntroAbout = async(() => import(/* webpackChunkName: "IntroAbout" */ "module/intro/about"), "Main");
const IntroResume = async(() => import(/* webpackChunkName: "IntroResume" */ "module/intro/resume"), "Main");

/** module */

const NoteList = async(() => import(/* webpackChunkName:"noteList" */ "module/note/list"), "Main");
const NoteDetail = async(() => import(/* webpackChunkName: "noteDetail" */ "module/note/detail"), "Main");

class Component extends React.PureComponent {
    render() {
        return (
            <div className="layout">
                {/* TODO: IE浏览器不支持 <main> */}
                <main>
                    <Switch>
                        <Route path="/" component={IntroHome} />
                        <Route path="/about" component={IntroAbout} />
                        <Route path="/resume" component={IntroResume} />
                        <Route path="/note/list" component={NoteList} />
                        <Route path="/note/detail" component={NoteDetail} />
                        <Route component={Notfound} />
                    </Switch>
                </main>
                <Footer />
            </div>
        );
    }
}

export default Component;
