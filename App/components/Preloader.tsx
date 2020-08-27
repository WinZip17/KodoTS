import React, {useRef, useEffect} from 'react';
import {View, Image, StyleSheet, Animated} from 'react-native';
import icons from '../assets/icons';

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    marginTop: -35,
    marginLeft: -35,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  spinner: {
    width: 45,
    height: 40,
  },
});

const Preloader = (): JSX.Element => {
  const animation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 6.28,
          duration: 1200,
          useNativeDriver: false,
          delay: 800,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: false,
          delay: 800,
        }),
      ]),
      {iterations: 10},
    ).start();
  }, []);
  return (
    <View style={styles.wrapper}>
      <Animated.View
        //style={{transform: [{rotate: animation}, {perspective: 1000}]}}
      >
        <Image style={styles.spinner} source={icons.icSpinner} />
      </Animated.View>
    </View>
  );
};

export default Preloader;
