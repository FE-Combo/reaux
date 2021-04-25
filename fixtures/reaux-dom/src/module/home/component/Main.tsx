import * as React from "react";
import {connect, DispatchProp} from "react-redux";
import useHomie from "../index";

interface Props extends DispatchProp {
    name: string;
}

class Main extends React.PureComponent<Props> {
    render() {
        const {actions} = useHomie();
        return (
            <div>
                {this.props.name}
                <button
                    onClick={() => {
                        this.props.dispatch(actions.test());
                    }}
                >
                    Test
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        name: state?.home?.name,
    };
};

export default connect(mapStateToProps)(Main);
