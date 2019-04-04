import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WeatherProject from './weather_project';
import Settings from './Settings'
import {createStackNavigator , createAppContainer} from "react-navigation"
const mainNavigator = createStackNavigator({
  Home:{screen: WeatherProject},
  Settings: {screen: Settings}
} , {initialRouteName:"Home"})
const App = createAppContainer(mainNavigator)
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
