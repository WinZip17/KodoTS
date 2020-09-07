import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  imageBackground: {
    minHeight: 140,
    position: 'relative',
    //maxHeight: 160,
    opacity: 1,
    borderRadius: 13,
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
  paginationContainerStyle: {
    marginTop: -15,
    marginBottom: -15,
  },
  paginationDotStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  paginationInactiveDotStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
  },
});
