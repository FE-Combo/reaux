import * as React from "react";
import {connect, DispatchProp} from "react-redux";
import aboutModule from "../index";

interface StateProps {
    name: string;
}
interface Props extends StateProps, DispatchProp {}

class Main extends React.PureComponent<Props> {
    render() {
        const {dispatch} = this.props;
        return (
            <div>
                {this.props.name}
                <button onClick={() => dispatch(aboutModule.actions.test())}>change</button>
            </div>
        );
    }
}

const mapStateToProps = (state: any): StateProps => {
    return {
        name: state?.about?.name,
    };
};

export default connect(mapStateToProps)(Main);
