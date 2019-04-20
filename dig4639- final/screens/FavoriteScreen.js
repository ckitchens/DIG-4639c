import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  AsyncStorage,
  Button
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import CountDownTimer from '../components/CountDownTimer'

const Notification = ({workout, close})=> workout?(
  <View style= {styles.notification}>
    <Text> Your {workout} is done</Text>
    <Button onPress= {close} title = "close"/>
  </View>
  ): null

export default class FavoriteScreen extends React.Component {
  state = {
    favorites:[],
    interval: null,
    workout: null,
  }

  setWorkout = (workout) => {
    this.setState({workout})
  }

  componentDidMount(){
    this.getFavorites()
  }
  getFavorites = async() => {
    let favorites = await AsyncStorage.getItem("favoriteList")
    favorites = JSON.parse(favorites)
    this.setState({favorites})
  }
  static navigationOptions = {
    header: null,
  };
  _gotoScreen = (item) => {
    console.log(item)
    this.props.navigation.navigate("Details", item)
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
      <Notification workout = {this.state.workout} close= {()=> this.setWorkout(null)}/>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>Start Working Out You Lazy Person</Text>
            <FlatList
             data={this.state.favorites}
             keyExtractor={this._keyExtractor}
              renderItem={({item}) => <TouchableOpacity onPress={(event) => {this._gotoScreen(item)}}>
                <Image source={item.image} style={{width:200,height:200}} />
                <CountDownTimer done = {()=> this.setWorkout(item.key)} />
              </TouchableOpacity>}
            />
            <Text style={styles.getLazyText}>Or dont its cool</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notification:{
  borderRadius: 4,
   borderWidth: 0.5,
   borderColor: '#d6d7da',
   textAlign: 'center',
   position: 'absolute',
   top : 50,
   left: '10%',
   zIndex: 1,
   width: '80%',
   backgroundColor: 'white',
   padding: 20,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 25,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    marginTop:50,
    textAlign: 'center',
  },
  getLazyText:{
    fontSize: 10,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    marginTop:75,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
