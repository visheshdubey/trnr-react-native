import React, { useState } from 'react';
import { View, Text, Image, Animated } from 'react-native';
import { Typography } from '../styles';
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
  blur_image = blur_image !== '' ? blur_image : 'https://trnr-app-media.s3.ap-southeast-2.amazonaws.com/placeholder_33c244a093.png?updated_at=2022-12-13T11:33:44.409Z'; // blur_image !== '' ? blur_image :
  return (
    <View style={{ overflow: 'hidden' }}>
      <FastImage
        style={styles.imageStyles}
        source={image ? { uri: image } : require('../assets/images/placeholder.png')}
        resizeMode={image ? 'cover' : 'contain'}
        onLoad={loaded}
        fallback={true}
        fadeDuration={0}
      />
      {<Animated.Image style={[styles.default, { opacity: fadeAnim }]} source={{ uri: blur_image }} resizeMode={'cover'} fadeDuration={0} fallback={true} onLoad={smallLoaded} />}
      {(isSmallLoaded || isLoaded) && text && (
        <Image
          style={[
            styles.backdrop,
            {
              width: '100%',
            },
          ]}
          source={backdrop}
          resizeMode="cover"
        ></Image>
      )}
      <View style={styles.backdrop}>{(isSmallLoaded || isLoaded) && text && <Text style={styles.text}>{Typography.truncateString(text, 50)}</Text>}</View>
    </View>
  );
}
