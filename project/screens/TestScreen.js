import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";
import LocationScreen from './LocationScreen';
import { withNavigation } from 'react-navigation';


import firebase from 'firebase';

class TestScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Hello, this is just a</Text>
                <Text>Test Screen</Text>
                <Button title="Go to Dashboard" onPress={() => this.props.navigation.navigate('DashboardScreen')} />
            </View>
        );
    }
}
export default withNavigation(TestScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});