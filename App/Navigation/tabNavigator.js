import React from 'react';
import {Platform} from 'react-native';

import {createBottomTabNavigator} from 'react-navigation-tabs';
import {StackActions, NavigationActions} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';

import HomeStack from './HomeStack';
import HomeScreen from '../Screens/HomeScreen';
import ProfileStack from './ProfileStack';
import OrderStack from './OrderStack';
import DeliveryScreen from '../Screens/DeliveryScreen';
import DeliveryStack from './DeliveryStack';
import colors from '../Theme/colors';
import tabBarIcon from './tabBarIcon';
import CartClear from '../Components/CartClear';
import HighloadScreen from '../Screens/HighloadScreen';
import EndRegistrationScreen from '../Screens/EndRegistrationScreen';
import DrawerContentComponentsWithRedux from './DrawerContent';

const isIos = Platform.OS === 'ios';

const titleMapping = {
  Cart: 'Корзина',
  Home: 'Меню',
  Delivery: 'Доставка',
  Profile: 'Кабинет',
};

const defaultNavOptions = ({navigation}) => {
  const {routeName} = navigation.state;
  return {
    tabBarIcon: tabBarIcon(routeName),
    tabBarLabel: titleMapping[routeName],
    tabBarOnPress: ({navigation, defaultHandler}) => {
      defaultHandler();
    },
  };
};

const defaultAndroidNavOptions = ({navigation}) => {
  const {routeName} = navigation.state;
  return {
    drawerLabel: titleMapping[routeName],
    drawerIcon: tabBarIcon(routeName),
  };
};

const routes = {
  Home: {
    screen: isIos ? HomeScreen : HomeStack,
  },
  Cart: {
    screen: OrderStack,
    navigationOptions: ({navigation, screenProps}) => ({
      tabBarOnPress: ({navigation, defaultHandler}) => {
        navigation.dispatch(StackActions.popToTop());
        defaultHandler();
      },
      headerTitle: 'Корзина',
      headerTitleStyle: {
        color: '#fff',
        textAlign: 'center',
        flex: 1,
        paddingLeft: 100,
      },
      headerRight: () => <CartClear />,
    }),
  },
  Delivery: {
    screen: isIos ? DeliveryScreen : DeliveryStack,
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: ({navigation, screenProps}) => {
      return {
        ...defaultNavOptions({navigation}),
        tabBarOnPress: ({navigation, defaultHandler}) => {
          navigation.navigate('Profile');
          defaultHandler();
        },
      };
    },
  },
  Highload: {
    screen: HighloadScreen,
    navigationOptions: {
      ...defaultNavOptions,
      header: null,
      tabBarButtonComponent: (routeName, onPress) => {
        return null;
      },
    },
  },
  EndRegistration: {
    screen: EndRegistrationScreen,
    navigationOptions: {
      ...defaultNavOptions,
      header: null,
      tabBarButtonComponent: (routeName, onPress) => {
        return null;
      },
    },
  },
};

export const tabNavigator = createBottomTabNavigator(routes, {
  defaultNavigationOptions: defaultNavOptions,
  tabBarOptions: {
    activeTintColor: colors.buttonMain,
    style: {
      backgroundColor: colors.background,
      paddingTop: 10,
      paddingBottom: 5,
      height: 60,
    },
    keyboardHidesTabBar: false,
  },
});

export const sideBarNavigator = createDrawerNavigator(routes, {
  drawerBackgroundColor: colors.backgroundItem,
  contentOptions: {
    inactiveTintColor: colors.whiteText,
    activeTintColor: colors.whiteText,
    iconContainerStyle: {
      opacity: 1,
    },
    itemsContainerStyle: {
      paddingTop: 15,
      paddingLeft: 10,
    },
  },
  defaultNavigationOptions: defaultAndroidNavOptions,
  contentComponent: DrawerContentComponentsWithRedux,
});
