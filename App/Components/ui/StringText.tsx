import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import React from 'react';

type PropsType = {
  text: string;
  style?: StyleProp<ViewStyle>;
};

export const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
});

const StringText = ({text, style}: PropsType) => {
  return <Text style={[styles.text, style]}>{text}</Text>;
};

export default StringText;
