import React from "react";
import {Async} from "reaux-dom";
import Loadable from "react-loadable";
import {connect, DispatchProp} from "react-redux";
import {Route, Switch, withRouter, RouteComponentProps} from "react-router-dom";

// const HomeView = Async(() => import(/* webpackChunkName: "home" */ "../../home"));
// const AboutView = Async(() => import(/* webpackChunkName: "about" */ "../../about"));

// const HomeView = Loadable({
//     loader: () => import(/* webpackChunkName: "home" */ "../../home").then(_ => _.default().component),
//     loading: () => null,
//     modules: ["home"],
// });

// const AboutView = Loadable({
//     loader: () => import(/* webpackChunkName: "about" */ "../../about").then(_ => _.default().component),
//     loading: () => null,
//     modules: ["about"],
// });

interface Props extends DispatchProp, RouteComponentProps {
    name: string;
    RouteComponent: React.ComponentType;
}

class Main extends React.PureComponent<Props> {
    render() {
        const {history, name, RouteComponent} = this.props;
        return (
            <div>
                <div>
                    <a onClick={() => history.push("/home")}>Home</a>
                    <a onClick={() => history.push("/about")}>About</a>
                </div>
                <br />
                {name}
                <br />
                <RouteComponent />
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        name: state?.main?.name || "",
    };
};

export default connect(mapStateToProps)(withRouter(Main));
