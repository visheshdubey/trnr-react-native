import { useEffect, useState, useRef } from 'react';
import { RefreshControl, View, StyleSheet, Image, ScrollView, Text, useWindowDimensions } from 'react-native';
import { Mixins, Typography } from '../../styles';
import Button from '../../components/Button';
import { useAddWorkoutMutation, useGetExerciseQuery } from '../../services/strapi';
import NetworkRequest from '../../components/NetworkRequest';
import { LOG, STRAPI_ADD_WORKOUT } from '../../utils/ApiConstants';
import { useSelector } from 'react-redux';
import VideoPlayerComponent from '../../components/VideoPlayerComponent';
import FastImage from 'react-native-fast-image';
import { useIsFocused } from '@react-navigation/native';

const HS_ExerciseDetailScreen = ({ route, navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { name, exerciseId } = route.params;
  const { error, data, isLoading, refetch } = useGetExerciseQuery(exerciseId);
  const [addWorkout, result] = useAddWorkoutMutation();
  const userId = useSelector((state) => state.user.customerID);
  const [rerender, setRerender] = useState(false);
  const scrollViewRef = useRef(null);
  const isFocused = useIsFocused();
  const inFullscreen = useSelector((state) => state.videoPlayer.inFullscreen);
  useEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, [name]);
  useEffect(() => {
    if (inFullscreen) scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }, [inFullscreen]);

  const handleSave = async () => {
    const work = await addWorkout(STRAPI_ADD_WORKOUT(userId, exerciseId)).catch((err) => {
      return console.log('🔴 ~ file: HS_ExerciseDetailScreen.jsx ~ line 33 ~ handleSave ~ err', err);
    });
    if (LOG === true) console.log('🚀 ~ file: HS_ExerciseDetailScreen.jsx ~ line 37 ~ handleSave ~ JSON.stringify(work)', JSON.stringify(work));
  };
  return (
    <View style={styles.container}>
      <ScrollView
        alwaysBounceVertical={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refetch} />}
        bouncesZoom={false}
        scrollEnabled={!inFullscreen}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
      >
        <NetworkRequest error={error} data={data} isLoading={isLoading}>
          {/* Video Player */}
          {data?.video != null ? <VideoPlayerComponent style={styles.video} videoUrl={data?.video.url} navigation={navigation} /> : null}
          {/* Large Images */}
          <View style={{ alignItems: 'center', marginBottom: 100, marginTop: 20 }}>
            {data?.image_large?.map((item) => (
              <FastImage style={styles.image} key={item.id} source={{ uri: item.url }} resizeMode="cover" fallback={true} />
            ))}
            {/* Small Images  */}
            <View style={styles.row}>
              {data?.image_small?.map((item) => (
                <FastImage style={styles.image2} key={item.id} source={{ uri: item.url }} resizeMode="cover" fallback={true} />
              ))}
            </View>
            {/* Text Body  */}
            <View style={styles.textContainer}>
              <Text style={styles.category}>{data?.exercise_category?.name}</Text>
              <Text style={styles.heading}>{data?.name}</Text>
              <Text style={styles.body}>{data?.description}</Text>
            </View>
            <Button onPress={handleSave} title="SAVE WORKOUT" fill="#000" color="#fff" isLoading={result.isLoading} />
          </View>
        </NetworkRequest>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    overflow: 'hidden',
    flexDirection: 'row',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Mixins.scaleSize(340),
    height: Mixins.scaleSize(340),
    marginBottom: Mixins.moderateScale(17.5),
    backgroundColor: '#eee',
    borderRadius: Mixins.moderateScale(15),
    overflow: 'hidden',
    marginHorizontal: 0,
  },
  image2: {
    width: Mixins.scaleSize(162.5),
    height: Mixins.scaleSize(162.5),

    backgroundColor: '#eee',
    overflow: 'hidden',
    borderRadius: 15,
    marginBottom: Mixins.moderateScale(17.5),
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Mixins.scaleSize(340),
    justifyContent: 'space-between',
  },
  video: {
    alignSelf: 'center',
    // width: Mixins.scaleSize(340),
    // height: Mixins.scaleSize(191.25),

    backgroundColor: '#000',
    // borderRadius: 15,
    marginBottom: Mixins.moderateScale(17.5),
  },
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
    marginTop: Mixins.moderateScale(12),
    fontFamily: Typography.FONT_FAMILY_BODY,
    fontSize: Typography.FONT_SIZE_16,
    textAlign: 'left',
    lineHeight: Typography.LINE_HEIGHT_18,
    width: Mixins.scaleSize(340),
    marginBottom: Mixins.moderateScale(17.5),
  },
});
export default HS_ExerciseDetailScreen;
