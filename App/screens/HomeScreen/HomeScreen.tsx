import React, {useEffect, useRef, useState} from 'react';
import {Text, StyleSheet, View, ScrollView, Platform} from 'react-native';
import GlobalStyles from '../../styles/Global';
import { categoriesInfo, itemMenuInfo } from '../../types/menuListTypes';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/reducers';
import * as Actions from '../../store/actions/';
import Banners from '../../components/Banners';
import CategoryList from '../../components/CategoryList';
// import throttle from 'lodash-es/throttle';
import filter from 'lodash-es/filter';
import matches from 'lodash-es/matches';
import GeneralStatusBarColor from '../../components/StatusBar';
import ItemCard from '../../components/ItemCard';
import ItemOptions from '../../components/ItemOptions';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  category: {
    fontSize: 20,
    color: '#ffffff',
    paddingLeft: 15,
  },
  scrollView: {},
});

const HomeScreen = () => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.menuList.categories,
  );
  const items = useSelector((state: RootState) => state.menuList.items);
  const activeCategory = useSelector(
    (state: RootState) => state.menuList.activeCategory,
  );

  let sorted;

  let catOffsets: any = {};
  let bannersHeight = 200;
  const [activePressCategory, setActivePressCategory] = useState<number | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [statusBarOff, setStatusBarOff] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (categories.length > 0) {
      dispatch(Actions.selectActiveCategory(categories[0].id));
    }
  }, [categories]);

  const getOffset = (cat: categoriesInfo) => {
    return catOffsets[cat.id];
  };

  const scrollTo = (cat: categoriesInfo) => {
    const edditionaloffset = 59;
    let offset = getOffset(cat) - edditionaloffset;
    activePressCategory = cat.id;
    dispatch(Actions.selectActiveCategory(categories[0].id));
    scrollViewRef.current &&
      scrollViewRef.current.scrollTo({x: 0, y: offset, animated: true});
  };

  const handleBannerHeight = (height: number) => {};

  return (
    <View style={GlobalStyles.background}>
      {Platform.OS === 'ios' && <GeneralStatusBarColor />}
      <View style={styles.container}>
        <ScrollView
          // stickyHeaderIndices={[1]}
          ref={scrollViewRef}
          // onScroll={() => handleScroll()}
        >
          <Banners handleBannerHeight={handleBannerHeight} />
          <CategoryList
            onChange={scrollTo}
            activeCategoryId={activeCategory}
            activePressCategory={activePressCategory}
          />
          {categories.map((cat) => {
            const catItems = filter(items, matches({category_id: cat.id}));
            return (
              <View
                key={cat.id}
                onLayout={(event) => {
                  const layout = event.nativeEvent.layout;
                  catOffsets[`${cat.id}`] = layout.y;
                  // if(Object.keys(catOffsets).length === categories.length){
                  //   sorted = Object.entries(catOffsets).sort((a,b) => {
                  //     return a[1] - b[1]
                  //   });
                  // }
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#ffffff',
                    paddingLeft: 15,
                    marginTop: 10,
                  }}>
                  {cat.name}
                </Text>
                {catItems.map((item) => {
                  return <ItemCard key={item.id} item={item} />;
                })}
              </View>
            );
          })}
        </ScrollView>

        <ItemOptions />
      </View>
    </View>
  );
};
export default HomeScreen;
