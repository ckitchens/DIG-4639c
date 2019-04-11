import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
//import DetailsStack from '../screens/DetailsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Detail: LinksScreen,
  Favorites: FavoriteScreen
}, {initialRouteName:"Home"});

export default HomeStack;

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

// const DetailsStack = createStackNavigator({
//   Details: DetailsScreen,
// });
//
// DetailsStack.navigationOptions = {
//   tabBarLabel: 'Details',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
//     />
//   ),
// };
