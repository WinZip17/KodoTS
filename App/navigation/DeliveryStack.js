import React from 'react';
import defaultNavigationStyle from './defaultNavOptions';
import {createStackNavigator} from 'react-navigation-stack';

import {Platform} from 'react-native';
const isIos = Platform.OS === 'ios';

import DeliveryScreen from '../screens/DeliveryScreen';
import MenuBurger from './MenuBurger';

const DeliveryStack = createStackNavigator({
  DeliveryScreen: {
    screen: DeliveryScreen,
    navigationOptions: ({navigation}) => ({
      ...defaultNavigationStyle,
      headerTitle: 'Доставка',
      headerLeft: () => (isIos ? null : <MenuBurger navigation={navigation} />),
    }),
  },
});

export default DeliveryStack;
