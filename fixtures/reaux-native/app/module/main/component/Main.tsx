import React from "react";
import {Platform, StyleSheet, Text, View, Button} from "react-native";
import {connect, DispatchProp} from "react-redux";
import {actions} from "../index"

interface StateProps {
    name: string;
}

interface Props extends StateProps, DispatchProp {}
class Main extends React.PureComponent<Props> {

    handlePress = () => this.props.dispatch(actions.test())

    render() {
        return (
            <View style={styles.container}>
                <Text>Redux: {this.props.name}</Text>
                <Button title="测试" onPress={this.handlePress} />
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.instructions}>To get started, edit App.js</Text>
                <Text style={styles.instructions}>{instructions}</Text>
            </View>
        );
    }
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        name: state.main.name,
    };
};

export default connect(mapStateToProps)(Main);

const instructions = Platform.select({
    ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
    android: "Double tap R on your keyboard to reload,\n" + "Shake or press menu button for dev menu",
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
    },
});
