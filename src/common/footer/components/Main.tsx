import React from "react";
import {connect, DispatchProp} from "react-redux";
import {RootState} from "type/state";
import "./index.less";

interface StateProps {
    name: string;
}

interface Props extends StateProps, DispatchProp {}
class Component extends React.PureComponent<Props> {
    render() {
        return (
            <footer className="footer-container">
                Copyright © <a href="https://www.iwangzh.com">www.iwangzh.com</a> All Rights Reserved. 备案号：xxx
            </footer>
        );
    }
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        name: state.app.main.name,
    };
};

export default connect(mapStateToProps)(Component);
