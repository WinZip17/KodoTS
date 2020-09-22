import React from 'react';
import {Image, StyleSheet, TouchableHighlight} from 'react-native';
import icons from '../assets/icons';
import {useDispatch} from 'react-redux';
import {showClear} from '../Stores/reducers/Actions';

const styles = StyleSheet.create({
  touchZone: {
    width: 46,
    height: 44,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
});

const CartClear: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const handleShowClear = () => {
    dispatch(showClear());
  };

  return (
    <TouchableHighlight
      style={styles.touchZone}
      onPress={handleShowClear}
      underlayColor="transparent"
      hitSlop={{top: 40, bottom: 40, left: 20, right: 20}}>
      <Image source={icons.icDelete} style={{width: 23, height: 22}} />
    </TouchableHighlight>
  );
};

export default CartClear;
