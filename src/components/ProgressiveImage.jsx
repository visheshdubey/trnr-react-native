import React from 'react';
import { View, Text, Image, Animated } from 'react-native';
import { Typography } from '../styles';
import { useState } from 'react';
// const image = require('../assets/images/exercise1.png');
import FastImage from 'react-native-fast-image';

const backdrop = require('../assets/images/cardGradient.png');
export default function ProgressiveImage({ image, blur_image, text = '', styles }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSmallLoaded, setIsSmallLoaded] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  // styles = StyleSheet.create(styles);

  const loaded = () => {
    setIsLoaded(true);
    fadeIn();
  };
  const smallLoaded = () => setIsSmallLoaded(true);

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };
  blur_image = blur_image !== '' ? blur_image : 'https://trnr-app-media.s3.ap-southeast-2.amazonaws.com/imageedit_1_9645229571_1_1_1_e9ac8ab835.webp';
  return (
    <View style={{ overflow: 'hidden' }}>
      <FastImage style={styles.imageStyles} source={{ uri: image }} resizeMode="cover" onLoad={loaded} fallback={true} fadeDuration={0} />
      {<Animated.Image style={[styles.default, { opacity: fadeAnim }]} source={{ uri: blur_image }} resizeMode="cover" fadeDuration={0} fallback={true} onLoad={smallLoaded} />}
      {isSmallLoaded && text && <Image style={styles.backdrop} source={backdrop} resizeMode="cover"></Image>}
      <View style={styles.backdrop}>{isSmallLoaded && text && <Text style={styles.text}>{Typography.truncateString(text, 50)}</Text>}</View>
    </View>
  );
}
