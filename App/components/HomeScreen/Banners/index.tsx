import React, {useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/reducers';
import {banner} from '../../../types/bannersTypes';
import {styles} from './banners.styles';
import BannersItem from './BannersItem';

const Banners = () => {
  const dimensions = Dimensions.get('window');
  const [activeSlide, setActiveSlide] = useState(0);
  const [width, setWidth] = useState(dimensions.width);
  const banners = useSelector((state: RootState) => state.banners.banners);
  const bannersLoading = useSelector(
    (state: RootState) => state.banners.loading,
  );

  const renderCarousel = () => {
    if (!banners || bannersLoading) {
      return <Text>Загрузка</Text>;
    }

    return (
      <Carousel
        autoplay={true}
        autoplayDelay={0}
        autoplayInterval={5000}
        data={banners}
        renderItem={(item: {item: banner}): JSX.Element => (
          <BannersItem item={item.item} />
        )}
        sliderWidth={width}
        itemWidth={width - 15}
        onSnapToItem={(index: number) => {
          setActiveSlide(index);
        }}
        loop={true}
        enableSnap={true}
        loopClonesPerSide={banners.length}
      />
    );
  };

  const renderPagination = () => {
    if (!banners || bannersLoading) {
      return <Text>Загрузка</Text>;
    }

    return (
      <Pagination
        dotsLength={banners.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainerStyle}
        dotStyle={styles.paginationDotStyle}
        inactiveDotStyle={styles.paginationInactiveDotStyle}
        inactiveDotScale={1}
      />
    );
  };

  return (
    <View
      style={styles.slider}
      onLayout={() => {
        setWidth(Dimensions.get('window').width);
      }}>
      {renderCarousel()}
      {renderPagination()}
    </View>
  );
};

export default Banners;
