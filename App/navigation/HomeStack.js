import React from 'react';
import defaultNavigationStyle from './defaultNavOptions';
import {createStackNavigator} from 'react-navigation-stack';

import {Platform} from 'react-native';
const isIos = Platform.OS === 'ios';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import MenuBurger from './MenuBurger';
import MenuAndroidCart from './MenuAndroidCart';

const HomeStack = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      ...defaultNavigationStyle,
      headerTitle: 'Меню',
      headerLeft: () => (isIos ? null : <MenuBurger navigation={navigation} />),
      headerRight: () => (isIos ? null : <MenuAndroidCart navigation={navigation} />),
    }),
  },
});

export default HomeStack;
