import React from 'react';

import defaultNavOptions from './defaultNavOptions';

import icons from '../assets/icons';
import MenuBurger from './MenuBurger';
import CartClear from '../Components/CartClear';

import {Image, Platform, TouchableHighlight} from 'react-native';

const isIos = Platform.OS === 'ios';

import AuthScreen from '../Screens/AuthScreen';
import CartScreen from '../Screens/CartScreen';
import OrderScreen from '../Screens/OrderScreen';

import OrderShowScreen from '../Screens/OrderShowScreen';
import OrderItemsScreen from '../Screens/OrderItemsScreen';
import OrderIdentificationScreen from '../Screens/OrderIdentificationScreen';

import CommentScreen from '../Screens/CommentScreen';
import TextScreen from '../Screens/TextScreen';
import {createStackNavigator} from '@react-navigation/stack';

export default createStackNavigator({
  CartScreen: {
    screen: CartScreen,
    navigationOptions: ({navigation}) => ({
      ...defaultNavOptions,
      headerTitle: 'Корзина',
      headerLeft: () => (isIos ? null : <MenuBurger navigation={navigation} />),
      headerRight: () =>
        navigation.state.params &&
        navigation.state.params.cartItems &&
        navigation.state.params.cartItems.length > 0 && <CartClear />,
    }),
  },
  AuthScreen: {
    screen: AuthScreen,
    navigationOptions: {
      ...defaultNavOptions,
      headerTitle: 'Авторизация',
    },
  },
  UserAgreement: {
    screen: TextScreen,
    navigationOptions: {
      ...defaultNavOptions,
      headerTitle: 'Пользовательского соглашение',
    },
  },
  Order: {
    screen: OrderScreen,
    navigationOptions: ({navigation}) => ({
      ...defaultNavOptions,
      headerTitle: 'Оформление',
      headerLeft: () => (
        <TouchableHighlight
          style={{marginLeft: 23}}
          onPress={() => navigation.navigate('CartScreen')}>
          <Image
            source={isIos ? icons.icArrowBack : icons.icBackAndroid}
            style={{width: isIos ? 11 : 18, height: 20}}
          />
        </TouchableHighlight>
      ),
    }),
  },
  OrderShow: {
    screen: OrderShowScreen,
    navigationOptions: ({navigation}) => ({
      ...defaultNavOptions,
      headerTitle: 'Заказ',
      headerLeft: isIos ? null : (
        <TouchableHighlight
          style={{marginLeft: 23}}
          onPress={() => navigation.navigate('CartScreen')}>
          <Image source={icons.icArrowBack} style={{width: 11, height: 20}} />
        </TouchableHighlight>
      ),
    }),
  },
  OrderItems: {
    screen: OrderItemsScreen,
    navigationOptions: {
      ...defaultNavOptions,
      headerTitle: 'Состав заказа',
    },
  },
  OrderIdentification: {
    screen: OrderIdentificationScreen,
    navigationOptions: {
      ...defaultNavOptions,
      headerTitle: 'Идентификация упаковки',
      headerLeft: () => isIos && null,
    },
  },
  Comment: {
    screen: CommentScreen,
    navigationOptions: ({navigation}) => ({
      ...defaultNavOptions,
      headerTitle: 'Комментарий',
      headerLeft: (
        <TouchableHighlight
          style={{marginLeft: 23}}
          onPress={() => navigation.goBack(null)}>
          <Image source={icons.icArrowBack} style={{width: 11, height: 20}} />
        </TouchableHighlight>
      ),
      headerRight: () =>
        navigation.state.params.canEditComment ? (
          <TouchableHighlight
            style={{marginRight: 25}}
            activeOpacity={1}
            underlayColor="transparent"
            onPress={navigation.getParam('submit')}>
            <Image source={icons.icSend} style={{width: 25, height: 25}} />
          </TouchableHighlight>
        ) : null,
    }),
  },
});
