import React from "react";
import { connect, DispatchProp } from "react-redux";

interface Props extends DispatchProp {
    name: string;
}

class Main extends React.PureComponent<Props> {
    render() {
        return (
            <div>Home Detail</div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        name: state.home.name,
    };
};

export default connect(mapStateToProps)(Main);
