import { useEffect, useState, useRef } from 'react';
import { RefreshControl, View, StyleSheet, Image, ScrollView, Text, useWindowDimensions, Linking } from 'react-native';
import { Mixins, Typography } from '../../styles';
import Button from '../../components/Button';
import { useAddWorkoutMutation, useDeleteWorkoutMutation, useGetExerciseQuery, useGetWorkoutsListQuery } from '../../services/strapi';
import NetworkRequest from '../../components/NetworkRequest';
import {  STRAPI_ADD_WORKOUT, STRAPI_DELETE_WORKOUT } from '../../utils/ApiConstants';
import { useDispatch, useSelector } from 'react-redux';
import VideoPlayerComponent from '../../components/VideoPlayerComponent';
import FastImage from 'react-native-fast-image';
import { useIsFocused } from '@react-navigation/native';
import SnackBar from '../../components/SnackBar';
import { exerciseSnack } from '../../services/features/snackBarSlice';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { moderateScale } from '../../styles/mixins';

const HS_ExerciseDetailScreen = ({ route, navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const bottomTabHeight = useBottomTabBarHeight();
  const { name, exerciseId } = route.params;
  const { error, data, isLoading, refetch } = useGetExerciseQuery(exerciseId);
  const userId = useSelector((state) => state.user.customerID);
  const workoutlist = useGetWorkoutsListQuery(userId);
  const [addWorkout, result] = useAddWorkoutMutation();
  const [deleteWorkout, delresult] = useDeleteWorkoutMutation();
  const [rerender, setRerender] = useState(false);
  const scrollViewRef = useRef(null);
  const isFocused = useIsFocused();
  const inFullscreen = useSelector((state) => state.videoPlayer.inFullscreen);
  const [snackText, setSnackText] = useState('');
  const dispatch = useDispatch();
  const snackState = useSelector((state) => state.snackBar.exerciseSnack);
  useEffect(() => {
    if (workoutlist?.data?.exercises?.find((o) => o.id === exerciseId)) {
    }
  }, [workoutlist?.data?.exercises?.length]);

  useEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, [name]);
  useEffect(() => {
    if (inFullscreen) scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }, [inFullscreen]);

  const handleSave = async () => {
    const work = await addWorkout(STRAPI_ADD_WORKOUT(exerciseId)).catch((err) => {
      return console.log('🔴 ~ file: HS_ExerciseDetailScreen.jsx ~ line 33 ~ handleSave ~ err', err);
    });
    setSnackText('SAVED TO MY WORKOUT');
    dispatch(exerciseSnack('ENTER'));
    setTimeout(() => {
      dispatch(exerciseSnack('EXIT'));
    }, 2000);
  };
  const handleDelete = async () => {
    deleteWorkout(STRAPI_DELETE_WORKOUT(exerciseId));
    setSnackText('REMOVED FROM MY WORKOUT');
    dispatch(exerciseSnack('ENTER'));
    setTimeout(() => {
      dispatch(exerciseSnack('EXIT'));
    }, 2000);
  };
  const handleShop = () => {
    navigation.navigate('SHOP_SCREEN', { link: data?.product?.product_link });
  };
  return (
    <View style={[styles.container, { marginBottom: bottomTabHeight }]}>
      <SnackBar state={snackState} text={snackText} />
      <ScrollView
        alwaysBounceVertical={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refetch} />}
        bouncesZoom={false}
        scrollEnabled={!inFullscreen}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
        ref={scrollViewRef}
      >
        <NetworkRequest error={error} data={data} isLoading={isLoading}>
          {/* Video Player */}
          {data?.video != null ? <VideoPlayerComponent style={styles.video} videoUrl={data?.video.url} navigation={navigation} /> : null}
          {/* Large Images */}
          <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 30 }}>
            {data?.image_large?.map((item, index) => (
              <View key={item.id}>
                <FastImage style={[styles.image, data?.image_large.length]} source={{ uri: item.url }} resizeMode="cover" fallback={true} />
                {data?.image_large?.length === 2 && (
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: '#000',
                      opacity: 0.9,
                      position: 'absolute',
                      borderRadius: 40,
                      top: 10,
                      left: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ fontFamily: Typography.FONT_FAMILY_HEADING, fontSize: Typography.FONT_SIZE_18, color: 'white' }}>{String.fromCharCode(65 + index)}</Text>
                  </View>
                )}
              </View>
            ))}
            {/* Small Images  */}
            <View style={styles.row}>
              {data?.image_small?.map((item) => (
                <FastImage
                  style={[styles.image2, data?.image_small?.length === 1 ? { width: Mixins.scaleSize(340) } : { width: Mixins.scaleSize(162.5) }]}
                  key={item.id}
                  source={{ uri: item.url }}
                  resizeMode="cover"
                  fallback={true}
                />
              ))}
            </View>
            <Text style={styles.body}>{data?.description}</Text>
            <View style={{}}>
              {workoutlist?.data?.exercises?.find((o) => o.id === exerciseId) ? (
                <Button onPress={handleDelete} title="REMOVE FROM MY WORKOUT" fill="#E2E5E9" color="#333" isLoading={delresult.isLoading} />
              ) : (
                <Button onPress={handleSave} title="SAVE WORKOUT" fill="#000" color="#fff" isLoading={result.isLoading} />
              )}

              {data?.product?.product_link && <Button style={{ marginTop: 10 }} onPress={() => Linking.openURL(data?.product?.product_link)} title="SHOP PRODUCT" fill="#E2E5E9" color="#333" />}
            </View>
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
    // marginBottom: Mixins.moderateScale(17.5),
  },
});
export default HS_ExerciseDetailScreen;
