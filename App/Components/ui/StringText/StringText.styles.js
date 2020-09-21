import {StyleSheet} from 'react-native';
import {normalize} from '../../../util/screen';

const styles = StyleSheet.create({
  stylesDefault: {
    fontSize: normalize(32),
    color: '#ffffff',
    fontWeight: '300',
  },
  stylesBold: {
    fontWeight: '600',
  },
  stylesDefaultHeader: {
    fontSize: normalize(50),
    fontWeight: '400',
  },
  stylesYellow: {
    color: '#ffcc00',
    fontWeight: '400',
  },
  stylesGreen: {
    color: '#53d769',
    fontWeight: '300',
  },
  stylesComments: {
    color: '#94878a',
    fontWeight: '400',
  },
  stylesPrice: {
    textAlign: 'right',
    fontWeight: 'bold',
    color: 'white',
    flexBasis: '20%',
  },
  stylesOpacity: {
    opacity: 0.8,
  },
  p1: {
    fontSize: normalize(34),
  },
  p2: {
    fontSize: normalize(32),
  },
  p3: {
    fontSize: normalize(29),
  },
  p4: {
    fontSize: normalize(28),
  },
  p5: {
    fontSize: normalize(26),
  },
  p6: {
    fontSize: normalize(20),
  },
  p7: {
    fontSize: normalize(12),
  },
});

export default styles;
