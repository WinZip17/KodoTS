import React, { useEffect, useState } from 'react';
import {Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import colors from '../../../styles/colors';
import {useSelector} from 'react-redux';
import {categoriesInfo} from '../../../types/menuListTypes';
import {RootState} from '../../../store/reducers';

const styles = StyleSheet.create({
  text: {
    padding: 10,
    margin: 5,
    borderRadius: 20,
    borderColor: 'rgba(192, 153, 72, 0.5)',
    borderWidth: 1,
    color: 'rgba(255, 204, 0, 0.8)',
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
});

type TypeProps = {
  category: categoriesInfo;
  onPress: () => void;
};

const Category = (props: TypeProps): JSX.Element => {
  const [pressStatus, setPressStatus] = useState(false);
  const activeCategory = useSelector(
    (state: RootState) => state.menuList.activeCategory,
  );

  const {category, onPress} = props;
  const {name, id} = category;

  const buttonColor =
    pressStatus || activeCategory === id
      ? colors.buttonMain
      : colors.background;
  const textColor =
    pressStatus || activeCategory === id
      ? colors.background
      : colors.buttonMain;

  const onHideUnderlay = () => {
    setPressStatus(false);
  };

  const onShowUnderlay = () => {
    setPressStatus(true);
  };

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressOut={onHideUnderlay}
      onPressIn={onShowUnderlay}>
      <Text
        style={[
          styles.text,
          {color: textColor, backgroundColor: buttonColor, opacity: 1},
        ]}>
        {name}
      </Text>
    </TouchableWithoutFeedback>
  );
};

export default Category;
