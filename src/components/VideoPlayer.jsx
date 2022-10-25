import { Video } from 'expo-av';
import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

const VideoPlayer = ({ videoUrl, style }) => {
  const [status, setStatus] = useState({});
  const [indicator, setIndicator] = useState(true);
  const video = useRef(null);
  const [orientationIsLandscape, setOrientation] = useState(true);

  async function changeScreenOrientation() {
    if (orientationIsLandscape == true) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    } else if (orientationIsLandscape == false) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }

  useEffect(() => {
    console.log(status.isPlaying);
    if (status.isPlaying || status.isBuffering) setIndicator(() => status.isPlaying);
  }, [status]);
  const toggleOrientation = () => {
    setOrientation(!orientationIsLandscape);
    changeScreenOrientation();
  };

  const screenOrientatonUpdated = (data) => {
    if (data.fullscreenUpdate === 0 || data.fullscreenUpdate === 3) toggleOrientation();
    console.log(JSON.stringify(data.fullscreenUpdate));
  };
  return (
    <View style={styles.overlap}>
      <Video
        ref={video}
        style={style}
        source={{
          uri: videoUrl,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        onFullscreenUpdate={(e) => screenOrientatonUpdated(e)}
      />
      {indicator ? <ActivityIndicator color="#000" /> : null}
    </View>
  );
};

const styles = StyleSheet.create({});

export default VideoPlayer;
