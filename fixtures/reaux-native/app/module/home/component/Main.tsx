import React from "react";
import {Text, View} from "react-native";
import {connect} from "react-redux";
import {RootState} from "../../../utils/state";

interface StateProps {
    name: string;
}

interface Props extends StateProps {}
class Main extends React.PureComponent<Props> {
    render() {
        return (
            <View>
                <Text>Module Home</Text>
            </View>
        );
    }
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        name: state.home.name,
    };
};

export default connect(mapStateToProps)(Main);
