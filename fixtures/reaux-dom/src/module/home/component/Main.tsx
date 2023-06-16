import React from "react";
import {connect, DispatchProp} from "react-redux";
import {AllState} from "../../../utils/state";
import {View} from "../../about";
import {actions} from "../index";

interface Props extends DispatchProp {
    name: string;
}

class Main extends React.PureComponent<Props> {
    render() {
        return (
            <div style={{height: "200vh"}}>
                {this.props.name}
                <button
                    onClick={() => {
                        this.props.dispatch(actions.test());
                    }}
                >
                    Test
                </button>
                <View />
            </div>
        );
    }
}

const mapStateToProps = (state: AllState) => {
    return {
        name: state.home.name,
    };
};

export default connect(mapStateToProps)(Main);
