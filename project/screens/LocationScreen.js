import React, { useState, useEffect } from 'react';
import { View, StyleSheet, } from 'react-native';
import * as Location from 'expo-location';
import firebase from 'firebase';
import config from '../config';
import MapView from 'react-native-maps';
import { withNavigation } from 'react-navigation';
import { AppLoading } from 'expo';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Card, CardItem } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

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
      <Container>
      <Header>
  
        <Body>
          <Title>Where Was I - Location</Title>
        </Body>
  
      </Header>
      <Content>
      <Card>
          <CardItem>
            <Body>
              <Text>
                 Thank you for allowing this app to track your location!
              </Text>
            </Body>
          </CardItem>
      </Card>
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
        <Button iconLeft style={{alignSelf: "center", marginTop: 15}} onPress={() => {this.props.navigation.goBack();}}>
            <Icon name='home' />
            <Text>Go back to Dashboard</Text>
        </Button>
       
      </Content>
    </Container>
    );
  
   // storeLocationData(location);
  }
  return (
    <Container>
    <Header>

      <Body>
        <Title>Where Was I - Location</Title>
      </Body>

    </Header>
    <Content>
    <Card>
        <CardItem>
          <Body>
            <Text>
               Hello, please allow location permission to use this app.
            </Text>
          </Body>
        </CardItem>
    </Card>

      <Text style={styles.instructions}>{text}</Text>
      <MapView style={styles.map}
          // region={}
          showsUserLocation={true}>
      </MapView>
      <Button iconLeft style={{alignSelf: "center", marginTop: 15}} onPress={() => {LocationScreen();}}>
            <Icon name='home' />
            <Text>Find location</Text>
        </Button>
     
    </Content>
    <Footer>
      <FooterTab>
        <Button full>
          <Text>Hello</Text>
        </Button>
      </FooterTab>
    </Footer>
  </Container>

  );
}

// export default withNavigation(LocationScreen);

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
      marginBottom:5,
      alignSelf: 'center'
    },
     button: {
       backgroundColor: 'turquoise',
       padding:10
     },
      buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#8e29fb',
        marginBottom:10,
        marginTop: 15
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
        marginTop: 20,
        alignSelf: 'center'
      },
});