import React, { Component } from "react";
import { 
    View,
    StyleSheet
} from "react-native";
import { AppLoading } from 'expo';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Card, CardItem } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';


import firebase from 'firebase';

class DashboardScreen extends Component {
    render() {
        return (
    <Container>
        <Header>

          <Body>
            <Title>Where Was I - Dashboard</Title>
          </Body>

        </Header>
        <Content>
        <Card>
            <CardItem>
              <Body>
                <Text>
                   Hello, this is just a test app to find your current location
                </Text>
              </Body>
            </CardItem>
        </Card>

        <Button iconLeft style={{alignSelf: "center", marginTop: 150}} onPress={() => this.props.navigation.navigate('LocationScreen')}>
            <Icon name='home' />
            <Text>Go to your Location</Text>
        </Button>

        <Button warning iconLeft style={{alignSelf: "center", marginTop: 10}} onPress={() => this.props.navigation.navigate('TestScreen')}>
            <Icon name='flag' />
            <Text>Go to test screen</Text>
        </Button>

        <Button danger iconLeft style={{alignSelf: "center", marginTop: 10}} onPress={() => firebase.auth().signOut()}>
            <Ionicons name='power' style={{fontSize: 27, paddingLeft: 15}} />
            <Text>Sign out</Text>
        </Button>

             <Button title="Sign out" onPress={() => firebase.auth().signOut()} />
         
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
}
export default withNavigation(DashboardScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});