import React from 'react';
import StringText from '../../ui/StringText/StringText';
import {styles} from '../cartScreen.styles';
import {Image, View} from 'react-native';
import images from '../../../assets/images';

const EmptyCartText = () => {
  return (
    <View style={[styles.productMainCenter, styles.productMain]}>
      <Image source={images.emptyCart} style={styles.basket} />
      <StringText
        format="bold"
        fontSize="p1"
        style={[
          styles.emptyText,
          {
            marginBottom: 10,
          },
        ]}>
        В корзине пусто
      </StringText>
      <StringText fontSize="p6" style={styles.emptyText}>
        Совсем ничего :(
      </StringText>
    </View>
  );
};

export default EmptyCartText;
