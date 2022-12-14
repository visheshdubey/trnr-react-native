import { Video } from 'expo-av';

import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

import { setStatusBarHidden } from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';

import VideoPlayer from 'expo-video-player';
import { Mixins } from '../styles';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateFullscreen, updateOrientation } from '../services/features/videoPlayerSlice';

const VideoPlayerComponent = ({ videoUrl, style }) => {
  const refVideo2 = useRef(null);
  const { height, width } = useWindowDimensions();
  const [rerender, setRerender] = useState(false);
  const navigation = useNavigation();

  const [status, setStatus] = React.useState({});
  // const inFullscreen = useSelector((state) => state.videoPlayer.inFullscreen);
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
        if ((await ScreenOrientation.getOrientationAsync()) !== ScreenOrientation.Orientation.LANDSCAPE_LEFT) {
          //This if condition was added because, On auto rotate off and puting video to landscape mode, it was getting into portrait after 2000ms automatically
          await ScreenOrientation.unlockAsync();
          console.log('Orientation Unlocked');
        }
      }, 2000);
      // console.log(evt.orientationInfo.orientation);
      console.log('🚀 ~ file: VideoPlayerComponent.jsx ~ line 41 ~ subscription ~ evt.orientationInfo.orientation', evt.orientationLock);
      if (evt.orientationInfo.orientation !== 1) {
        setStatusBarHidden(true, 'fade');
        updateFullscreenHandler(true);
      }
      if (evt.orientationInfo.orientation === 1) {
        setStatusBarHidden(false, 'fade');
        updateFullscreenHandler(false);
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
        } else {
          e.preventDefault();
          navigation.dispatch(e.data.action);
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
          console.log('Yo 2', inFullscreenRef);
        }
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
        videoProps={{
          shouldPlay: true,
          resizeMode: inFullscreenRef.current ? 'cover' : 'contain',
          isLooping: true,
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
            refVideo2.current.setStatusAsync({
              shouldPlay: true,
            });
          },
          exitFullscreen: async () => {
            setStatusBarHidden(false, 'fade');
            updateFullscreenHandler(!inFullscreenRef.current);
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
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
