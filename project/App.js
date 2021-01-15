import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import LoadingScreen from './screens/LoadingScreen';
import LocationScreen from './screens/LocationScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';

import firebase from 'firebase';
import { firebaseConfig } from './config';
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return <AppNavigator />;
  }
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen:{ screen: LoadingScreen },
  LoginScreen:LoginScreen,
  DashboardScreen: { screen: DashboardScreen },
  LocationScreen: { screen: LocationScreen }
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  }
});

/**const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
  },
   logo: {
     width: 309,
     height: 159,
     marginBottom: 10
   },
    instructions: {
      color: '#8e29fb',
      fontSize: 18,
      marginHorizontal: 15,
      marginBottom:15
    },
     button: {
       backgroundColor: 'turquoise',
       padding:10
     },
      buttonText: {
        fontSize: 20,
        color: '#fff'
      },
      thumbnail: {
        width: 300,
        height: 300,
        marginBottom: 15,
        resizeMode: "cover"
      }
}); **/