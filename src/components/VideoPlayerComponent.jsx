import { Video } from 'expo-av';

import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, useWindowDimensions, BackHandler } from 'react-native';

import { setStatusBarHidden } from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';
import { LOG } from '../utils/ApiConstants';

import VideoPlayer from 'expo-video-player';
import { Mixins } from '../styles';
import { useNavigation } from '@react-navigation/native';
import { DeviceMotion } from 'expo-sensors';
import { useDispatch, useSelector } from 'react-redux';
import { updateFullscreen, updateOrientation } from '../services/features/videoPlayerSlice';

const VideoPlayerComponent = ({ videoUrl, style }) => {
  const refVideo2 = useRef(null);
  const { height, width } = useWindowDimensions();
  const [rerender, setRerender] = useState(false);
  const navigation = useNavigation();
  const inFullscreen = useSelector((state) => state.videoPlayer.inFullscreen);
  const orientation = useSelector((state) => state.videoPlayer.orientation);
  const dispatch = useDispatch();
  const inFullscreenRef = useRef(false);
  const updateFullscreenHandler = (fs) => {
    inFullscreenRef.current = fs;
    dispatch(updateFullscreen(fs));
  };

  useEffect(() => {
    // set initial orientation
    ScreenOrientation.getOrientationAsync().then((info) => {
      dispatch(updateOrientation(1));
      ScreenOrientation.unlockAsync();
    });
    let timeout;

    // subscribe to future changes
    const subscription = ScreenOrientation.addOrientationChangeListener(async (evt) => {
      dispatch(updateOrientation(evt.orientationInfo.orientation));
      timeout = setTimeout(async () => {
        await ScreenOrientation.unlockAsync();
        console.log('2. Unlocked');
      }, 2000);
      // console.log(evt.orientationInfo.orientation);
      console.log('🚀 ~ file: VideoPlayerComponent.jsx ~ line 41 ~ subscription ~ evt.orientationInfo.orientation', evt.orientationLock);
      if (evt.orientationInfo.orientation !== 1) {
        setStatusBarHidden(true, 'fade');

        updateFullscreenHandler(true);
        // await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
        // ScreenOrientation.unlockAsync();
      }
      if (evt.orientationInfo.orientation === 1) {
        setStatusBarHidden(false, 'fade');
        // await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        // ScreenOrientation.unlockAsync();
        updateFullscreenHandler(false);
        console.log('------------------->?');
      }
    });

    // return a clean up function to unsubscribe from notifications
    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (inFullscreenRef.current) {
      navigation.setOptions({
        headerShown: false,
        headerBackVisible: false,
        gestureEnabled: false,
      });
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'none',
        },
      });
    } else {
      navigation.setOptions({
        headerShown: true,
        headerBackVisible: true,
      });
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'flex',
          position: 'absolute',
          backgroundColor: '#000',
        },
      });
    }
  }, [inFullscreenRef.current]);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', async (e) => {
        if (inFullscreenRef.current) {
          e.preventDefault();
          console.log('Yo 1', inFullscreenRef);
          setStatusBarHidden(false, 'fade');
          updateFullscreenHandler(!inFullscreenRef.current);
          refVideo2.current.setStatusAsync({
            shouldPlay: false,
          });
          setRerender(!rerender);
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

          // timeout = setTimeout(async () => {
          //   await ScreenOrientation.unlockAsync();
          //   console.log('1. Unlocked');
          // }, 2000);
        } else {
          e.preventDefault();
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
          navigation.dispatch(e.data.action);
          console.log('Yo 2', inFullscreenRef);
        }
        // console.log(await ScreenOrientation.getOrientationAsync());
      }),
    [navigation]
  );

  return (
    <View
      style={{
        alignItems: 'center',
        overflow: 'hidden',
        width: inFullscreenRef.current ? width : Mixins.WINDOW_WIDTH,
        backgroundColor: '#000',
      }}
    >
      <VideoPlayer
        // defaultControlsVisible={true}
        videoProps={{
          shouldPlay: false,
          resizeMode: inFullscreenRef.current ? 'cover' : 'contain',
          source: {
            uri: videoUrl,
          },
          ref: refVideo2,
        }}
        fullscreen={{
          inFullscreen: inFullscreenRef.current,
          enterFullscreen: async () => {
            setStatusBarHidden(true, 'fade');
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);

            updateFullscreenHandler(!inFullscreenRef.current);

            // await ScreenOrientation.unlockAsync();
            refVideo2.current.setStatusAsync({
              shouldPlay: false,
            });
          },
          exitFullscreen: async () => {
            setStatusBarHidden(false, 'fade');
            updateFullscreenHandler(!inFullscreenRef.current);
            // await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
            // timeout = setTimeout(async () => {
            //   await ScreenOrientation.unlockAsync();

            //   console.log('3. Unlocked');
            // }, 2000);
            refVideo2.current.setStatusAsync({
              shouldPlay: false,
            });
          },
        }}
        style={{
          videoBackgroundColor: 'black',
          height: inFullscreenRef.current ? height : (Mixins.WINDOW_WIDTH / 16) * 9,
          width: inFullscreenRef.current ? (orientation == 1 ? width : width - 50) : Mixins.WINDOW_WIDTH,
          backgroundColor: '#000',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default VideoPlayerComponent;
