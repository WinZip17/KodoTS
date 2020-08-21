import React from 'react';
import {Image, View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import icons from '../assets/icons';
import {useSelector} from 'react-redux';

const styles = StyleSheet.create({
  block: {
    marginRight: 15,
  },
  image: {
    width: 30,
    height: 30,
  },
});

const MenuAndroidCart = ({navigation}) => {
  const isCart = useSelector(({cart}) =>
    cart.items && cart.items.length > 0 ? icons.icCart : icons.icCartAndroid,
  );
  return (
    <View style={styles.block}>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('CartScreen')}
        hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}>
        <Image source={isCart} style={styles.image} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default MenuAndroidCart;
