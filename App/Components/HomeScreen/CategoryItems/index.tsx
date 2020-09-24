import React from 'react';

import {View, LayoutChangeEvent} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../Stores/reducers';
import {itemMenuInfo} from '../../../Types/menuListTypes';
import {styles} from '../HomeScreenComponent.styles';
import StringText from '../../ui/StringText/StringText';
import ItemCard from '../ItemCard';
import * as Actions from '../../../Stores/reducers/Actions';

type PropsTypes = {
  item: {
    id: number;
    name: string;
    catItems: itemMenuInfo[];
  };
};

const CategoryItems = (props: PropsTypes): JSX.Element => {
  const dispatch = useDispatch();
  const {item} = props;

  const categories = useSelector(
    (state: RootState) => state.menuList.categories,
  );
  const sorted = useSelector((state: RootState) => state.menuList.sorted);
  const catOffsets = useSelector(
    (state: RootState) => state.menuList.catOffsets,
  );

  return (
    <View
      style={styles.categoriesWrap}
      key={item.id}
      onLayout={(event: LayoutChangeEvent) => {
        const newCatOffsets = catOffsets;
        newCatOffsets[item.id] = event.nativeEvent.layout.y;
        dispatch(Actions.setCatOffsets(newCatOffsets));
        dispatch(Actions.selectActiveCategory(item.id));
        if (sorted.length === 0) {
          if (Object.keys(catOffsets).length === categories.length) {
            const newSorted = Object.entries(catOffsets)
              .sort((a, b) => a[1] - b[1])
              .map((arr) => [Number(arr[0]), arr[1]]);
            dispatch(Actions.setSorted(newSorted));
          }
        }
      }}
    >
      <StringText
        text={item.name}
        format="defaultHeader"
        style={styles.categoriesHeader}
      />
      {item.catItems &&
        item.catItems.map((item) => {
          return <ItemCard key={item.id} item={item} />;
        })}
    </View>
  );
};

export default CategoryItems;
