import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WeatherProject from './weather_project.1';
import Settings from './Settings'

import {createStackNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createStackNavigator({
  Home: {screen: WeatherProject},
  Settings: {screen: Settings},
}, {initialRouteName:"Home"});

const App = createAppContainer(MainNavigator);

export default App;


// export default class App extends React.Component {
//   render() {
//     return (
//       <WeatherProject />
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
