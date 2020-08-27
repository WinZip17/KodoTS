import React from 'react';
import {
  Platform,
  View,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {normalize} from '../util/screen';

const isIos = Platform.OS === 'ios';
const styles = StyleSheet.create({
  header: {
    textTransform: 'uppercase',
    marginTop: normalize(40),
    marginLeft: normalize(30),
    marginBottom: normalize(18),
    color: '#fff',
    fontSize: normalize(28),
  },
  background: {
    backgroundColor: '#3b2327',
    margin: 8,
    overflow: 'hidden',
    borderRadius: isIos ? 8 : 4,
  },
});

type PropsTypes = {
  header?: string;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

const ListItem = (props: PropsTypes) => {
  const {header} = props;
  return (
    <>
      {header && <Text style={styles.header}>{header}</Text>}
      <View style={[styles.background, props.style]}>{props.children}</View>
    </>
  );
};
export default ListItem;
