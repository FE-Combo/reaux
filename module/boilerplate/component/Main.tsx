import React from "react";
import {connect, DispatchProp} from "react-redux";
import {RootState} from "type/state";
import "./index.less";

interface StateProps {}

interface Props extends StateProps, DispatchProp {}

class {1} extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return <div />;
    }
}

const mapStateToProps = (state: RootState): StateProps => {
    return {};
};

export default connect(mapStateToProps)({1});
