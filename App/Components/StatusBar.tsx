import React from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import {getStatusBarHeight, isIphoneX} from 'react-native-iphone-x-helper';

const styles = StyleSheet.create({
  statusBar: {
    height: isIphoneX() ? getStatusBarHeight() + 15 : 30,
  },
});

const GeneralStatusBarColor: React.FC = (): JSX.Element => {
  return (
    <View style={styles.statusBar}>
      <StatusBar barStyle="light-content" />
    </View>
  );
};

export default GeneralStatusBarColor;
