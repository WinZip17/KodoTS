import HomeScreen from '../Screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import defaultNavOptions from './defaultNavOptions';
import MenuBurger from './MenuBurger';
import {Platform} from 'react-native';
import MenuAndroidCart from './MenuAndroidCart';
import OrderStack from './OrderStack';
import CartClear from '../Components/CartClear';
const Stack = createStackNavigator();

const isIos = Platform.OS === 'ios';

const Container = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          // @ts-ignore
          options={{
            title: 'Меню',
            ...defaultNavOptions,
            headerLeft: () => (isIos ? null : <MenuBurger />),
            headerRight: () => (isIos ? null : <MenuAndroidCart />),
          }}
        />
        <Stack.Screen
          name="CartScreen"
          // @ts-ignore
          component={OrderStack}
          // @ts-ignore
          options={{
            title: 'Корзина',
            ...defaultNavOptions,
            headerTitleStyle: {
              color: '#fff',
              textAlign: 'center',
              flex: 1,
              paddingLeft: 100,
            },
            headerRight: () => <CartClear />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Container;
