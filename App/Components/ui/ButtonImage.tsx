import React from 'react';
import {StyleSheet, Image, TouchableOpacity, ImageProps} from 'react-native';
import colors from '../../Theme/colors';
import {normalize} from '../../util/screen';
import StringText from './StringText/StringText';

const styles = StyleSheet.create({
  ButtonImageWrapper: {
    width: normalize(195),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: normalize(73),
    maxHeight: normalize(73),
    marginBottom: normalize(13),
  },
  ButtonText: {
    opacity: 0.6,
    color: colors.buttonMain,
    fontWeight: '300',
    textAlign: 'center',
  },
});

type propsTypes = {
  onPress: () => void;
  image: Readonly<ImageProps>;
  textButton: string;
};

const ButtonImage = (props: propsTypes) => {
  const {onPress, image, textButton} = props;

  return (
    <TouchableOpacity style={styles.ButtonImageWrapper} onPress={onPress}>
      <Image style={styles.icon} source={image} />
      <StringText style={styles.ButtonText} text={textButton} fontSize="p1" />
    </TouchableOpacity>
  );
};

export default ButtonImage;
