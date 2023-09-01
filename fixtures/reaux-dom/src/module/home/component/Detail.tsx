import React from "react";
import {AllState} from "../../../utils/state";
import {connect, DispatchProp} from "react-redux";

interface Props extends DispatchProp {
    name: string;
    test?: string;
}

class Main extends React.PureComponent<Props> {
    render() {
        return <div>Home Detail</div>;
    }
}

const mapStateToProps = (state: AllState) => {
    return {
        name: state.home.name,
    };
};

export default connect(mapStateToProps)(Main);
