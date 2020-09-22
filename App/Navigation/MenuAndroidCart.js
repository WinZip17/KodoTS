import React from 'react';
import {Image, View, TouchableWithoutFeedback, StyleSheet, TouchableOpacity} from 'react-native';
import icons from '../assets/icons';
import {useSelector} from 'react-redux';
import CartIcon from "../Components/CartIcon";

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
  return (
    <View style={styles.block}>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('CartScreen')}
        hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}>
        <CartIcon />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default MenuAndroidCart;
