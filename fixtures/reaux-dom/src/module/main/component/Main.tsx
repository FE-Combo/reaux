import * as React from "react";
import {connect, DispatchProp} from "react-redux";
import * as Loadable from "react-loadable";
import {Async} from "reaux-dom";
import {Route, Switch, withRouter, RouteComponentProps} from "react-router-dom";

const HomeView = Loadable({
    loader: () => import(/* webpackChunkName: "home" */ "../../home").then(_ => _.View),
    loading: () => null,
    modules: ["HomeView"],
});
const HomeDetailView = Loadable({
    loader: () => import(/* webpackChunkName: "home" */ "../../home").then(_ => _.View2),
    loading: () => null,
    modules: ["HomeDetailView"],
});
const AboutView = Loadable({
    loader: () => import(/* webpackChunkName: "about" */ "../../about").then(_ => _.View),
    loading: () => null,
    modules: ["AboutView"],
});
interface Props extends DispatchProp, RouteComponentProps {
    name: string;
}

class Main extends React.PureComponent<Props> {
    render() {
        const {history, name} = this.props;
        return (
            <div>
                <div>
                    <a onClick={() => history.push("/home")}>Home</a>
                    <a onClick={() => history.push("/about")}>About</a>
                </div>
                <br />
                {name}
                <br />
                <Switch>
                    <Route exact path="/home" render={() => <HomeView />} />
                    <Route exact path="/home/detail" render={() => <HomeDetailView />} />
                    <Route exact path="/about" render={() => <AboutView />} />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        name: state.main.name,
    };
};

export default connect(mapStateToProps)(withRouter(Main));
