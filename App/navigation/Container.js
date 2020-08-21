import {createAppContainer} from 'react-navigation';
import {Platform} from 'react-native';
import {sideBarNavigator, tabNavigator} from './tabNavigator';
const isIos = Platform.OS === 'ios';

export default createAppContainer(isIos ? tabNavigator : sideBarNavigator);
