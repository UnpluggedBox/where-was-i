import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { AppLoading } from 'expo';
import { Container, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import LoadingScreen from './screens/LoadingScreen';
import LocationScreen from './screens/LocationScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import TestScreen from './screens/TestScreen';

import firebase from 'firebase';
import { firebaseConfig } from './config';
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }
  render() {
    return <AppNavigator />;
  }
}


const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen:{ screen: LoadingScreen },
  LoginScreen:LoginScreen,
  DashboardScreen: { screen: DashboardScreen },
  LocationScreen: { screen: LocationScreen },
  TestScreen: { screen: TestScreen }
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