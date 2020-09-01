import React from 'react';
import {View, Platform} from 'react-native';
import GlobalStyles from '../Theme/Global';
import GeneralStatusBarColor from '../Components/StatusBar';
import HomeScreenComponent from '../Components/HomeScreen';

const HomeScreen = (): JSX.Element => {
  return (
    <View style={GlobalStyles.background}>
      {Platform.OS === 'ios' && <GeneralStatusBarColor />}
      <HomeScreenComponent />
    </View>
  );
};

export default HomeScreen;
