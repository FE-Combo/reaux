import React from "react";
import {connect, DispatchProp} from "react-redux";
import {RootState} from "type/state";
import "./index.less";
import {Controller} from "module/common/header";

interface StateProps {
    name: string;
}

interface Props extends StateProps, DispatchProp {}
class Component extends React.PureComponent<Props> {
    render() {
        return (
            <header className="header-container">
                <img src={require("./asset/logo.png")} />
                <nav>
                    <a onClick={() => this.props.dispatch(Controller.pushHistoryByNav("/notes"))}>笔记</a>
                    <a onClick={() => this.props.dispatch(Controller.pushHistoryByNav("/demo"))}>示例</a>
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
