import {StyleSheet, Text} from 'react-native';
import React from 'react';

type PropsType = {text: string};

export const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: '#ffffff',
    paddingLeft: 15,
  },
});

const HeaderTextName = ({text}: PropsType) => {
  return <Text style={styles.text}>{text}</Text>;
};

export default HeaderTextName;
