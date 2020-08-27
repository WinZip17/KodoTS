import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {RootState} from '../store/reducers';
import {banner} from '../types/bannersTypes';

const styles = StyleSheet.create({
  imageBackground: {
    height: 160,
    position: 'relative',
    opacity: 0.55,
  },
  swiper: {
    margin: 20,
    alignItems: 'center',
    flex: 1,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    position: 'absolute',
    bottom: 20,
    color: '#fff',
    fontSize: 20,
    left: 15,
    fontWeight: 'bold',
    width: 200,
  },
  slider: {
    marginTop: 15,
    height: 200,
  },
});

type PropsType = {handleBannerHeight: (height: number) => void};

const Banners = (props: PropsType) => {
  const dimensions = Dimensions.get('window');
  const [activeSlide, setActiveSlide] = useState(0);
  const [width, setWidth] = useState(dimensions.width);
  const banners = useSelector((state: RootState) => state.banners.banners);
  const bannersLoading = useSelector(
    (state: RootState) => state.banners.loading,
  );

  const {handleBannerHeight} = props;

  const renderItem = (item: banner): JSX.Element  => {
    return (
      <View>
        <FastImage
          key={item.id}
          style={[styles.imageBackground, {borderRadius: 13}]}
          source={{uri: item.image}}
        />
        <Text style={styles.text}>{item.name}</Text>
      </View>
    );
  };

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
        renderItem={(item: {item: banner; index: number}) =>
          renderItem(item.item)
        }
        sliderWidth={width}
        itemWidth={width - 15}
        onSnapToItem={(index: number) => {
          setActiveSlide(index);
        }}
        loop={true}
        enableSnap={true}
        loopClonesPerSide={banners.length}
        enableMomentum={true}
        lockScrollWhileSnapping={true}
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
        containerStyle={{
          marginTop: -15,
          marginBottom: -15,
        }}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 1)',
        }}
        inactiveDotStyle={{
          backgroundColor: 'rgba(255, 255, 255, 0.45)',
        }}
        inactiveDotScale={1}
      />
    );
  };

  return (
    <View
      style={styles.slider}
      onLayout={(event) => {
        const layout = event.nativeEvent.layout;
        handleBannerHeight(layout.height);
        setWidth(Dimensions.get('window').width);
      }}>
      {renderCarousel()}
      {renderPagination()}
    </View>
  );
};

export default Banners;
