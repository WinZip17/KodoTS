import {StackNavigationProp} from '@react-navigation/stack';

export type HomeStackParamList = {
  HomeScreen: undefined;
  Cart: undefined;
  Delivery: undefined;
  Profile: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  HomeStackParamList
>;
