import "asset/css/global.less";
import React from "react";
import {connect, DispatchProp} from "react-redux";
import {RootState} from "type/state";
import {Switch} from "react-router-dom";
import MainLayout from "./MainLayout";
import Route from "framework/component/Route";
import {isLoading} from "framework";
import Loading from "component/Loading";
import "./index.less";

interface StateProps {
    name: string;
    isLoading: boolean;
}

interface Props extends StateProps, DispatchProp {}
class Main extends React.PureComponent<Props> {
    render() {
        const {isLoading} = this.props;
        return (
            <Loading isLoading={isLoading}>
                <div className="main-container g-full-screen">
                    <Switch>
                        <Route path="/register" />
                        <Route component={MainLayout} />
                    </Switch>
                </div>
            </Loading>
        );
    }
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        name: state.app.main.name,
        isLoading: isLoading(),
    };
};

export default connect(mapStateToProps)(Main);
