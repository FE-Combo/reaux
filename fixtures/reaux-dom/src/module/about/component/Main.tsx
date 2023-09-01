import React from "react";
import {actions} from "../index";
import {AllState} from "../../../utils/state";
import {connect, DispatchProp} from "react-redux";

interface StateProps {
    name: string;
}
interface Props extends StateProps, DispatchProp {
    test?: string;
}

class Main extends React.PureComponent<Props> {
    render() {
        return (
            <div>
                {this.props.name}
                <button onClick={() => this.props.dispatch(actions.test())}>push</button>
                <button onClick={() => this.props.dispatch(actions.setState({name: "new about"}))}>reset name</button>
                <button onClick={() => this.props.dispatch(actions.resetState(["name"]))}>reset name</button>
            </div>
        );
    }
}

const mapStateToProps = (state: AllState): StateProps => {
    return {
        name: state.about.name,
    };
};

const Index = connect(mapStateToProps)(Main);

export default Index;
