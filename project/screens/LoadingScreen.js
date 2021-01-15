import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet, ActivityIndicator   
} from "react-native";
import { withNavigation } from 'react-navigation';


import firebase from 'firebase';

class LoadingScreen extends Component {
    componentDidMount() {
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(
            function(user) {
            if (user) {
                this.props.navigation.navigate('DashboardScreen');
            } else {
                this.props.navigation.navigate('LoginScreen');
            }
        }.bind(this)
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        );
    }
}
export default withNavigation(LoadingScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});