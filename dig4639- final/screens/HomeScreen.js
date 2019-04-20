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

const workouts = [
  {key: 'yoga',image: require('../assets/images/yoga.jpg')},
  {key: 'core',image: require('../assets/images/core.jpg')},
  {key:'side', image: require('../assets/images/side.jpg')},
  {key:'circuit', image:require('../assets/images/circuit.jpg')}]

export default class HomeScreen extends React.Component {
  state = {
    favorites:[]
  }
  static navigationOptions = {
    header: null,
  };
  _gotoScreen = (item) => {
    console.log(item)
    this.props.navigation.navigate("Details", item)
  }
  handlefavoriteClick = async (item) => {
    let favoriteList = await AsyncStorage.getItem("favoriteList")
    favoriteList = JSON.parse(favoriteList)
    if(!favoriteList || !Array.isArray(favoriteList)){

      favoriteList = []
    }
    favoriteList = favoriteList.filter(x => x.key !== item.key)
      favoriteList.push(item)

    await AsyncStorage.setItem("favoriteList", JSON.stringify(favoriteList))
    const x = await AsyncStorage.getItem("favoriteList")
    console.log(x)
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
      <Text style={styles.getStartedText}>Workout with us</Text>
        <Button
          title = "Favorites"
          onPress = {
            () => navigate("Favorites")
          }
        />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>

            <FlatList
             data={workouts}
             keyExtractor={this._keyExtractor}
              renderItem={({item}) => <TouchableOpacity onPress={(event) => { this.handlefavoriteClick(item)}}>
                <Image source={item.image} style={{width:200,height:200}} />
              </TouchableOpacity>}
            />
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
    marginTop: 50,
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
