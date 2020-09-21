import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';
import Banners from './Banners';
import CategoryList from './CategoryList';
import filter from 'lodash-es/filter';
import matches from 'lodash-es/matches';
import ItemCard from './ItemCard';
import Index from '../SharedComponents/ItemOptions/';
import React, {useRef, useState} from 'react';
import {styles} from './HomeScreenComponent.styles';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../Stores/reducers';
import * as Actions from '../../Stores/reducers/Actions';
import {categoriesInfo} from '../../Types/menuListTypes';
import {throttle} from 'lodash-es';
import StringText from '../ui/StringText/StringText';

type catOffsetsTypes = {
  [key: number]: number;
};

const HomeScreenComponent = () => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.menuList.categories,
  );
  const items = useSelector((state: RootState) => state.menuList.items);
  const activeCategory = useSelector(
    (state: RootState) => state.menuList.activeCategory,
  );

  const [sorted, setSorted] = useState<number[][]>([]);
  const [catOffsets, setCatOffsets] = useState<catOffsetsTypes>({});

  const [activePressCategory, setActivePressCategory] = useState<number | null>(
    null,
  );

  const scrollViewRef = useRef<ScrollView>(null);

  const scrollTo = (cat: categoriesInfo) => {
    const edditionaloffset = 59;
    let offset = catOffsets[cat.id] - edditionaloffset;
    setActivePressCategory(cat.id);
    dispatch(Actions.selectActiveCategory(cat.id));
    scrollViewRef.current &&
      scrollViewRef.current.scrollTo({x: 0, y: offset, animated: true});
  };

  const onPageScroll = throttle((e) => {
    let activeCategoryId = categories[0].id;
    let offset: number = e.nativeEvent.contentOffset.y;
    if (sorted) {
      for (let [key, value] of sorted) {
        if (value - 60 < offset) {
          activeCategoryId = key;
        } else {
          break;
        }
      }
    }
    if (activePressCategory && activePressCategory === activeCategoryId) {
      setActivePressCategory(null);
      dispatch(Actions.selectActiveCategory(activeCategoryId));
    }
    if (!activePressCategory && activeCategory !== activeCategoryId) {
      dispatch(Actions.selectActiveCategory(activeCategoryId));
    }
  }, 200);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    e.persist();
    onPageScroll(e);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        stickyHeaderIndices={[1]}
        ref={scrollViewRef}
        onScroll={handleScroll}>
        <Banners />
        <CategoryList
          onChange={scrollTo}
          activeCategoryId={activeCategory}
          activePressCategory={activePressCategory}
        />
        {categories.map((cat) => {
          const catItems = filter(items, matches({category_id: cat.id}));
          return (
            <View
              style={styles.categoriesWrap}
              key={cat.id}
              onLayout={(event: LayoutChangeEvent) => {
                const newCatOffsets = catOffsets;
                catOffsets[cat.id] = event.nativeEvent.layout.y;
                setCatOffsets(newCatOffsets);
                if (sorted.length === 0) {
                  if (Object.keys(catOffsets).length === categories.length) {
                    setSorted(
                      Object.entries(catOffsets)
                        .sort((a, b) => a[1] - b[1])
                        .map((arr) => [Number(arr[0]), arr[1]]),
                    );
                  }
                }
              }}>
              <StringText
                text={cat.name}
                format="defaultHeader"
                style={styles.categoriesHeader}
              />
              {catItems.map((item) => {
                return <ItemCard key={item.id} item={item} />;
              })}
            </View>
          );
        })}
      </ScrollView>
      <Index />
    </View>
  );
};

export default HomeScreenComponent;
