import { Video } from 'expo-av';

import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, useWindowDimensions, BackHandler } from 'react-native';

import { setStatusBarHidden } from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';
import { LOG } from '../utils/ApiConstants';

import VideoPlayer from 'expo-video-player';
import { Mixins } from '../styles';

const VideoPlayerComponent = ({ videoUrl, style, navigation }) => {
  const refVideo2 = useRef(null);
  const { height, width } = useWindowDimensions();
  const [inFullscreen2, setInFullsreen2] = useState(false);
  useEffect(() => {
    if (inFullscreen2) {
      navigation.setOptions({
        headerShown: false,
      });
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'none',
        },
      });
    } else {
      navigation.setOptions({
        headerShown: true,
      });
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'flex',
          position: 'absolute',
          backgroundColor: '#000',
        },
      });
    }
    // return () =>
    //   navigation.getParent()?.setOptions({
    //     tabBarStyle: undefined,
    //   });
  }, [inFullscreen2]);
  useEffect(() => {
    const backAction = async () => {
      if (inFullscreen2) {
        setStatusBarHidden(false, 'fade');
        setInFullsreen2(!inFullscreen2);
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        console.log('Back Pressed');
      } else {
        navigation.goBack();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [inFullscreen2]);
  return (
    <View style={{ borderRadius: inFullscreen2 ? 0 : 15, overflow: 'hidden' }}>
      <VideoPlayer
        videoProps={{
          shouldPlay: false,
          resizeMode: inFullscreen2 ? 'contain' : 'cover',
          source: {
            uri: videoUrl,
          },
          ref: refVideo2,
        }}
        fullscreen={{
          inFullscreen: inFullscreen2,
          enterFullscreen: async () => {
            setStatusBarHidden(true, 'fade');
            setInFullsreen2(!inFullscreen2);
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
            refVideo2.current.setStatusAsync({
              shouldPlay: true,
            });
          },
          exitFullscreen: async () => {
            setStatusBarHidden(false, 'fade');
            setInFullsreen2(!inFullscreen2);
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
          },
        }}
        style={{
          videoBackgroundColor: 'black',
          height: inFullscreen2 ? height : Mixins.scaleSize(191.25),
          width: inFullscreen2 ? width : Mixins.scaleSize(340),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default VideoPlayerComponent;
