import React from 'react';

import Icons from '../assets/icons';
import ProfileScreen from '../Screens/ProfileScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import OrdersHistoryScreen from '../Screens/OrdersHistoryScreen';

import defaultNavOptions from './defaultNavOptions';
import {createStackNavigator} from 'react-navigation-stack';
import NonstandartOrderScreen from '../Screens/NonstandartOrderScreen';
import ReviewScreen from '../Screens/ReviewScreen';

import OrderShowScreen from '../Screens/OrderShowScreen';
import OrderItemsScreen from '../Screens/OrderItemsScreen';
import OrderInfoScreen from '../Screens/OrderInfoScreen';
import OrderIdentificationScreen from '../Screens/OrderIdentificationScreen';
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
