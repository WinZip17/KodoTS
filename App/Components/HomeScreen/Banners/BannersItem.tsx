import {banner} from '../../../Types/bannersTypes';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {styles} from './banners.styles';
import React from 'react';

type PropsTypes = {
  item: banner;
};

const BannersItem = ({item}: PropsTypes): JSX.Element => {
  return (
    <View>
      <FastImage
        key={item.id}
        style={styles.imageBackground}
        source={{uri: item.image}}
      />
      <Text style={styles.text}>{item.name}</Text>
    </View>
  );
};

export default BannersItem;
