import React from 'react';
import {useSelector} from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import icons from '../assets/icons';

const drawetStyles = StyleSheet.create({
  textItem: {
    color: '#ffffff',
    padding: 20,
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  navContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 15,
    flexDirection: 'row',
    textAlign: 'left',
  },
});

const DrawerContentComponents = ({navigation}) => {
  const user = useSelector((state) => state.user.user);
  const items = [
    {
      navOptionThumb: 'icHome',
      navOptionName: 'Меню',
      screenToNavigate: 'Home',
    },
    {
      navOptionThumb: 'icCart',
      navOptionName: 'Корзина',
      screenToNavigate: 'Cart',
    },
    {
      navOptionThumb: 'icDelivery',
      navOptionName: 'Доставка',
      screenToNavigate: 'Delivery',
    },
    {
      navOptionThumb: 'icProfile',
      navOptionName: 'Профиль',
      screenToNavigate: 'Profile',
    },
  ];

  const navigateToScreen = (route) => () => {
    if (route === 'Cart' && Platform.OS === 'android' && user && user.id) {
      navigation.navigate('CartScreen');
      return;
    }
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    navigation.dispatch(navigateAction);
  };

  return (
    <View style={{paddingTop: 20}}>
      {items.map((item) => {
        return (
          <TouchableWithoutFeedback
            key={item.screenToNavigate}
            onPress={navigateToScreen(item.screenToNavigate)}>
            <View style={drawetStyles.navContainer}>
              <View style={{width: 36}}>
                <Image
                  source={icons[item.navOptionThumb]}
                  style={{
                    width: item.navOptionThumb === 'icDelivery' ? 36 : 25,
                    height: item.navOptionThumb === 'icCart' ? 23 : 25,
                    alignSelf: 'center',
                  }}
                />
              </View>
              <Text
                style={drawetStyles.textItem}
                onPress={navigateToScreen(item.screenToNavigate)}>
                {item.navOptionName}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

export default DrawerContentComponents;
