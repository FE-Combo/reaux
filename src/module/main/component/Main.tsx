import React from "react";
import {connect, DispatchProp} from "react-redux";
import {RootState} from "../../../type/state";
import {actions} from "../index";
import {Switch} from "react-router-dom";
import MainLayout from "./MainLayout";
import Route from "../../../../core/component/Route";

interface StateProps {
    name: string;
}

interface Props extends StateProps, DispatchProp {}
class Component extends React.PureComponent<Props> {
    render() {
        const {dispatch} = this.props;
        return (
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
    };
};

export default connect(mapStateToProps)(Component);
