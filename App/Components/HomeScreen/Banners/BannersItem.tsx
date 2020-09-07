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
    <View style={{flex: 1}}>
      <FastImage
        key={item.id}
        style={styles.imageBackground}
        source={{uri: item.image}}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.text}>{item.name}</Text>
    </View>
  );
};

export default BannersItem;
