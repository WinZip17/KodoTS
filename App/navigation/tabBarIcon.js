import React from 'react';

import {Image} from 'react-native';
import CartIcon from '../components/CartIcon';
import icons from '../assets/icons';

const tabBarIcon = (routeName) => {
  return ({tintColor}) => {
    switch (routeName) {
      case 'Home':
        return (
          <Image
            source={icons.icHome}
            style={{width: 25, height: 25, tintColor: tintColor}}
            tintColor={tintColor}
          />
        );
      case 'Cart':
        return <CartIcon tintColor={tintColor} />;
      case 'Delivery':
        return (
          <Image
            source={icons.icDelivery}
            style={{width: 36, height: 25, tintColor: tintColor}}
            tintColor={tintColor}
          />
        );
      case 'Profile':
        return (
          <Image
            source={icons.icProfile}
            style={{width: 25, height: 25, tintColor: tintColor}}
            tintColor={tintColor}
          />
        );
      default:
        return null;
    }
  };
};

export default tabBarIcon;
