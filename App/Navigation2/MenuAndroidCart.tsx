import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CartIcon from '../Components/CartIcon';

const styles = StyleSheet.create({
  block: {
    marginRight: 15,
  },
});

const MenuAndroidCart = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.block}>
      <TouchableOpacity
        onPress={() => navigation.navigate('CartScreen')}
        hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}>
        <CartIcon />
      </TouchableOpacity>
    </View>
  );
};

export default MenuAndroidCart;
