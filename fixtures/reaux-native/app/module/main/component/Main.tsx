import React from "react";
import {Platform, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {View as HomeView} from "../../home";
import {RootState} from "../../../utils/state";

interface StateProps {
    name: string;
}

interface Props extends StateProps {}
class Main extends React.PureComponent<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.instructions}>To get started, edit App.js</Text>
                <Text style={styles.instructions}>{instructions}</Text>
                <HomeView />
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
