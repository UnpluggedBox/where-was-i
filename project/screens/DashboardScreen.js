import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";
import LocationScreen from './LocationScreen';

import firebase from 'firebase';

class DashboardScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Dashboard Screen</Text>
                <Button title="Go to Location" onPress={() => this.props.navigation.navigate('LocationScreen')} />
                <Button title="Sign out" onPress={() => firebase.auth().signOut()} />
            </View>
        );
    }
}
export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});