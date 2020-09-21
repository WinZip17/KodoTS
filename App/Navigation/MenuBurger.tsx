import React from 'react';
import {Image, View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import icons from '../assets/icons';

const styles = StyleSheet.create({
  block: {
    marginLeft: 15,
  },
  image: {
    width: 30,
    height: 20,
  },
});

const MenuBurger: React.FC = (): JSX.Element => {
  const navigation = useNavigation();

  return (
    <View style={styles.block}>
      <TouchableWithoutFeedback
        // @ts-ignore
        onPress={() => navigation.toggleDrawer()}
        hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}>
        <Image source={icons.icBurger} style={styles.image} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default MenuBurger;
