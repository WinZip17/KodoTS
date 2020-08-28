import React from 'react';
import {View, Platform} from 'react-native';
import GlobalStyles from '../styles/Global';
import GeneralStatusBarColor from '../components/StatusBar';
import HomeScreenComponent from '../components/HomeScreen';

const HomeScreen = (): JSX.Element => {
  return (
    <View style={GlobalStyles.background}>
      {Platform.OS === 'ios' && <GeneralStatusBarColor />}
      <HomeScreenComponent />
    </View>
  );
};

export default HomeScreen;
