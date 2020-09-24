import React, {useEffect, useRef} from 'react';

import {View, FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../Stores/reducers';
import {categoriesInfo} from '../../../Types/menuListTypes';
import Category from './Category';

const styles = StyleSheet.create({
  flatList: {
    padding: 10,
    zIndex: 2,
  },
});

type PropsTypes = {
  activeCategoryId: number;
  activePressCategory: number | null;
  onChange: (item: categoriesInfo) => void;
};

const CategoryList = (props: PropsTypes): JSX.Element => {
  const {activeCategoryId, onChange, activePressCategory} = props;

  const categories = useSelector(
    (state: RootState) => state.menuList.categories,
  );
  const flatListRef = useRef<FlatList<categoriesInfo>>(null);

  useEffect(() => {
    if (categories && activeCategoryId && !activePressCategory) {
      const index: number = categories.findIndex(
        (item) => item.id === activeCategoryId,
      );
      if (flatListRef.current !== null && index !== -1) {
        flatListRef.current.scrollToIndex({animated: true, index});
      }
    }
  }, [activeCategoryId, activePressCategory, categories]);

  if (!categories) {
    return <View />;
  }

  return (
    <View>
      <FlatList
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        style={[styles.flatList, {paddingTop: 10}]}
        horizontal
        data={categories}
        keyExtractor={(item) => `${item.id}`}
        renderItem={(item: {item: categoriesInfo; index: number}) => {
          return (
            <Category
              category={item.item}
              onPress={() => {
                onChange(item.item);
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default CategoryList;
