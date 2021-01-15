import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, Button } from 'react-native';
import * as Location from 'expo-location';
import firebase from 'firebase';
import config from '../config';
import MapView from 'react-native-maps';
import { withNavigation } from 'react-navigation';

function LocationScreen() {
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
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      //let location = await Location.reverseGeocodeAsync(reverseLocation);
     let location = await Location.getCurrentPositionAsync({});
     let locationAddress = await Location.reverseGeocodeAsync({longitude: location.coords.longitude, latitude: location.coords.latitude});

      setLocation(location);
      setAddress(locationAddress);
    })();
  }, []);

  let text = 'Waiting..';
  let latitude = null;
  let longitude = null;
  let addressLocationStr = '';
  let addressLocationParse = null;
  let addressLocationParseResult = 'test';
  if (errorMsg) {
    text = errorMsg;
  } else if (location && address) {
    text = JSON.stringify(location);
    latitude = location.coords.latitude;
    longitude = location.coords.longitude;
    addressLocationStr = JSON.stringify(address);
    addressLocationParse = JSON.parse(addressLocationStr);
    addressLocationParseResult = addressLocationParse[0].city + ', ' + addressLocationParse[0].subregion
     + ', ' + addressLocationParse[0].region + ', ' + addressLocationParse[0].country;
    console.log(addressLocationStr);
    console.log(addressLocationParse);
    console.log(addressLocationParseResult);
    // console.log(latitude);
    // console.log(longitude);
    
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>{text}</Text>
        <MapView style={styles.map}
                region={{
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
            showsUserLocation={true}>
        <MapView.Marker coordinate={{ latitude : latitude , longitude : longitude }} />
        </MapView>
        <Text style={styles.buttonText}>You are at: {addressLocationParseResult} </Text>
        <Button style={styles.button} title="Go to Dashboard" onPress={() => this.props.navigation.navigate('DashboardScreen')} />
      </View>
    );
  
   // storeLocationData(location);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>{text}</Text>
      <MapView style={styles.map}
          // region={}
          showsUserLocation={true}>
      </MapView>
    </View>
  );
}

export default withNavigation(LocationScreen);

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
      marginBottom:5
    },
     button: {
       backgroundColor: 'turquoise',
       padding:10
     },
      buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
        marginBottom:10
      },
      thumbnail: {
        width: 300,
        height: 300,
        marginBottom: 15,
        resizeMode: "cover"
      },
        map: {
        width: 250,
        height: 250,
        marginTop: 20
      },
});