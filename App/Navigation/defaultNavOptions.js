import {Platform} from 'react-native';
import colors from '../Theme/colors';
const isIos = Platform.OS === 'ios';

const defaultNavOptions = isIos
  ? {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: colors.background,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        color: '#fff',
        fontSize: 26,
      },
      headerBackTitle: null,
    }
  : {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#3b2327',
      },
      headerTitleStyle: {
        color: '#fff',
        fontSize: 26,
      },
    };

export default defaultNavOptions;
