import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, MapView } from 'react-native';
import * as Location from 'expo-location';
import firebase from 'firebase';
import config from '../config';

export default function LocationScreen() {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(config);
  }else {
    firebase.app(); // if already initialized, use that one
    console.log("fail") 
 }

  firebase.auth().onAuthStateChanged(user => {
    if (user != null) {
      console.log('We are authenticated now!');
    }
  
  });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let reverseLocation = await Location.getCurrentPositionAsync({});
      //let location = await Location.reverseGeocodeAsync(reverseLocation);
     let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location.coords.latitude);
      console.log(location.coords.longitude)
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    // return (
    //   <MapView
    //     style={{ flex: 1 }}
    //     initialRegion={{
    //       latitude: location.coords.latitude,
    //       longitude: location.coords.longitude,
    //       latitudeDelta: 0.1,
    //       longitudeDelta: 0.1
    //     }}
    //   />
    // );
  
   // storeLocationData(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
}

function storeLocationData(user, location) {
  firebase
    .database()
    .ref('/users/' + user)
    .set({
      lastLocation: location,
    });
}


const styles = StyleSheet.create({
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
});