import * as React from 'react';
import { View, StyleSheet, Image, ScrollView, Text, Alert } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mixins, Spacing, Typography } from '../../styles';
import Button from '../../components/Button';

const HS_ExerciseDetailScreen = () => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: 'center', marginBottom: 100 }}>
          <Image
            style={styles.image}
            source={require('../../assets/images/1.png')}
            resizeMode="contain"
          />
          <Image
            style={styles.image}
            source={require('../../assets/images/2.png')}
            resizeMode="contain"
          />
          <View style={styles.row}>
            <Image
              style={styles.image2}
              source={require('../../assets/images/3.png')}
              resizeMode="contain"
            />
            <Image
              style={styles.image2}
              source={require('../../assets/images/4.png')}
              resizeMode="contain"
            />
          </View>
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: 'https://trnr-test-01.s3.ap-southeast-2.amazonaws.com/1bd664a3428444b3b72a5e56b7e22c82_293fee3655.mp4?updated_at=2022-09-25T10:25:04.411Z',
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          <View style={styles.textContainer}>
            <Text style={styles.category}>UPPER BODY</Text>
            <Text style={styles.heading}>PUSH UPS</Text>
            <Text style={styles.body}>
              IDEAL FOR UPPER BODY CONDITIONING, TARGETING THE BACK, PECS, SHOULDERS, BICEPS,
              TRICEPS AND ABS. HELPS DEVELOP MUSCLE MASS. PROTECT JOINTS AND INCREASE BONE DENSITY.
              DOOR ANCHOR INCLUDED THAT CAN BE POSITIONED AT VARIOUS HEIGHTS TO LEVERAGE A DIVERSE
              RANGE OF EXERCISES. CONTES DES AMINOS MANTAPELOS.
            </Text>
          </View>
          <Button
            onPress={() => Alert.alert('Exercise Saved!')}
            title="SAVE WORKOUT"
            fill="#000"
            color="#fff"
          />
          {/* <View style={styles.buttons}>
          <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
        </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    overflow: 'hidden',
    flexDirection: 'row',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Mixins.scaleSize(340),
    height: Mixins.scaleSize(340),
    marginBottom: Mixins.scaleSize(17.5),
    overflow: 'hidden',
    marginHorizontal: 0,
  },
  image2: {
    width: Mixins.scaleSize(162.5),
    height: Mixins.scaleSize(162.5),
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    width: Mixins.scaleSize(340),
    justifyContent: 'space-between',
    marginBottom: Mixins.scaleSize(17.5),
  },
  video: {
    alignSelf: 'center',
    width: Mixins.scaleSize(340),
    height: Mixins.scaleSize(191.25),
    marginBottom: Mixins.scaleSize(17.5),
  },
  // textContainer: {
  //   width: Mixins.scaleSize(340),
  // },
  category: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_18,
    textAlign: 'left',
    width: Mixins.scaleSize(340),
  },
  heading: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_32,
    textAlign: 'left',
    width: Mixins.scaleSize(340),
  },
  body: {
    marginTop: Mixins.scaleSize(12),
    fontFamily: Typography.FONT_FAMILY_BODY,
    fontSize: Typography.FONT_SIZE_16,
    textAlign: 'left',
    lineHeight: Typography.LINE_HEIGHT_18,
    width: Mixins.scaleSize(340),
    marginBottom: Mixins.scaleSize(17.5),
  },
});
export default HS_ExerciseDetailScreen;
