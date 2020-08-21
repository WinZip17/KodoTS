import React from 'react';

import Icons from '../assets/icons';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import OrdersHistoryScreen from '../screens/OrdersHistoryScreen';

import defaultNavOptions from './defaultNavOptions';
import {createStackNavigator} from 'react-navigation-stack';
import NonstandartOrderScreen from '../screens/NonstandartOrderScreen';
import ReviewScreen from '../screens/ReviewScreen';

import OrderShowScreen from '../screens/OrderShowScreen';
import OrderItemsScreen from '../screens/OrderItemsScreen';
import OrderInfoScreen from '../screens/OrderInfoScreen';
import OrderIdentificationScreen from '../screens/OrderIdentificationScreen';
import {Platform, TouchableHighlight, Image} from 'react-native';
import MenuBurger from './MenuBurger';

const isIos = Platform.OS === 'ios';

const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({navigation}) => ({
      ...defaultNavOptions,
      headerTitle: 'Кабинет',
      headerLeft: () => (isIos ? null : <MenuBurger navigation={navigation} />),
    }),
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      ...defaultNavOptions,
      headerTitle: 'Настройки',
    },
  },
  OrdersHistory: {
    screen: OrdersHistoryScreen,
    navigationOptions: {
      ...defaultNavOptions,
      headerTitle: 'История',
    },
  },
  NonStandard: {
    screen: NonstandartOrderScreen,
    navigationOptions: {
      ...defaultNavOptions,
      headerTitle: 'Нестандартные заказы',
    },
  },
  SendReview: {
    screen: ReviewScreen,
    navigationOptions: ({navigation}) => ({
      ...defaultNavOptions,
      headerTitle: 'Оставить отзыв',
      headerRight: () => (
        <TouchableHighlight
          style={{marginRight: 25}}
          activeOpacity={1}
          underlayColor="transparent"
          onPress={navigation.getParam('submit')}>
          <Image source={Icons.icSend} style={{width: 25, height: 25}} />
        </TouchableHighlight>
      ),
    }),
  },
  OrderShow: {
    screen: OrderShowScreen,
    navigationOptions: {
      ...defaultNavOptions,
      headerTitle: 'Заказ',
    },
  },
  OrderItems: {
    screen: OrderItemsScreen,
    navigationOptions: {
      ...defaultNavOptions,
      headerTitle: 'Состав заказа',
      headerBackTitle: null,
    },
  },
  OrderIdentification: {
    screen: OrderIdentificationScreen,
    navigationOptions: {
      ...defaultNavOptions,
      headerTitle: 'Идентификация упаковки',
      headerLeft: null,
    },
  },
  OrderInfo: {
    screen: OrderInfoScreen,
    navigationOptions: ({navigation}) => ({
      ...defaultNavOptions,
      headerTitle: `Заказ ${navigation.getParam('date', '')}`,
    }),
  },
});

export default ProfileStack;
