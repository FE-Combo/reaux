import "asset/css/global.less";
import React from "react";
import {connect, DispatchProp} from "react-redux";
import {RootState} from "../../../type/state";
import {actions} from "../index";
import {Switch} from "react-router-dom";
import MainLayout from "./MainLayout";
import Route from "../../../../core/component/Route";
import Welcome from "./Welcome";
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
            <div className="g-full-screen g-flex-center">
                <Welcome />
            </div>
        ) : (
            <div className="main-container">
                <Switch>
                    <Route path="/register" />
                    <Route component={MainLayout} />
                </Switch>
                <button onClick={() => dispatch(actions.test())}>Button</button>
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
