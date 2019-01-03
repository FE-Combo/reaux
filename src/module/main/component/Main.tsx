import "asset/css/global.less";
import React from "react";
import {connect, DispatchProp} from "react-redux";
import {RootState} from "type/state";
import {actions} from "../index";
import {Switch} from "react-router-dom";
import MainLayout from "./MainLayout";
import Route from "../../../../core/component/Route";
import Welcome from "./Welcome";
import {push} from "connected-react-router";
import "./index.less";

interface StateProps {
    name: string;
    showWelcome: boolean;
}

interface Props extends StateProps, DispatchProp {}
class Component extends React.PureComponent<Props> {
    render() {
        const {dispatch, showWelcome} = this.props;
        return showWelcome ? (
            <Welcome />
        ) : (
            <div className="main-container g-full-screen g-flex-center g-no-scroll">
                <Switch>
                    <Route path="/register" />
                    <Route component={MainLayout} />
                </Switch>
                <div className="container">
                    <h1>vocoWone</h1>
                    <div className="g-flex-between">
                        <div className="item" onClick={() => dispatch(push("/"))}>
                            博客
                        </div>
                        <div className="item" onClick={() => dispatch(push("/resume"))}>
                            jl
                        </div>
                        <div className="item" onClick={() => dispatch(push("/about"))}>
                            关于
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        name: state.app.main.name,
        showWelcome: state.app.main.showWelcome,
    };
};

export default connect(mapStateToProps)(Component);
