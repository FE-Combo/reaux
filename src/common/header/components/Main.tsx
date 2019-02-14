import React from "react";
import {connect, DispatchProp} from "react-redux";
import {RootState} from "type/state";
import "./index.less";
import {actions} from "common/header";

interface StateProps {
    name: string;
}

interface Props extends StateProps, DispatchProp {}
class Component extends React.PureComponent<Props> {
    render() {
        return (
            <header className="header-container">
                <img src={require("./assets/logo.png")} />
                <nav>
                    <a onClick={() => this.props.dispatch(actions.pushHistoryByNav("/notes"))}>笔记</a>
                    <a onClick={() => this.props.dispatch(actions.pushHistoryByNav("/demo"))}>示例</a>
                </nav>
            </header>
        );
    }
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        name: state.app.main.name,
    };
};

export default connect(mapStateToProps)(Component);
