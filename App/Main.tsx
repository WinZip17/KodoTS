import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import ErrorBoundary from './Components/ErrorBoundary';
import NavigationContainer from './Navigation/Container';
import * as Actions from './Stores/reducers/Actions';
import {Text} from 'react-native';
import {categoriesInfo, itemMenuInfo} from './Types/menuListTypes';
import {banner} from './Types/bannersTypes';
import FastImage from 'react-native-fast-image';

const Main: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const requests = [
    dispatch(Actions.getUser()),
    dispatch(Actions.getItems()),
    dispatch(Actions.getCategories()),
    dispatch(Actions.getTextList()),
    dispatch(Actions.getBannersList()),
    dispatch(Actions.getSettings()),
    dispatch(Actions.getLabelsList()),
    dispatch(Actions.getStreetsList()),
    dispatch(Actions.getLastOrder()),
  ];

  useLayoutEffect(() => {
    // @ts-ignore
    Promise.all(requests).then((r) => {
      const tasks: string[] = [];
      // @ts-ignore
      const banners: banner[] = r[4].payload;
      // @ts-ignore
      const items: itemMenuInfo[] = r[1].payload;
      // @ts-ignore
      const categories: categoriesInfo[] = r[2].payload;
      // @ts-ignore
      const activeCategory: number = r[2].payload[0].id || 0;

      banners.forEach((b) => tasks.push(b.image));

      items
        .filter((item) => item.category_id === activeCategory)
        .slice(0, 5)
        .forEach((i) => tasks.push(i.image ? i.image : ''));

      FastImage.preload(
        tasks.map((i) => ({uri: i})),
        () => {},
        () => {
          setTimeout(() => {
            setLoading(true);
          }, 500);
        },
      );
    });
  }, []);

  if (!loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ErrorBoundary>
      <NavigationContainer />
    </ErrorBoundary>
  );
};

export default Main;
