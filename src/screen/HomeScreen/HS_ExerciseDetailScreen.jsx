import { useEffect, useRef, useState } from 'react';
import { RefreshControl, View, StyleSheet, Image, ScrollView, Text, Alert } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mixins, Spacing, Typography } from '../../styles';
import Button from '../../components/Button';
import { useAddWorkoutMutation, useGetExerciseQuery } from '../../services/strapi';
import NetworkRequest from '../../components/NetworkRequest';
import { STRAPI_ADD_WORKOUT } from '../../utils/ApiConstants';

const HS_ExerciseDetailScreen = ({ route, navigation }) => {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const { name, exerciseId } = route.params;
  const { error, data, isLoading, isSuccess, refetch } = useGetExerciseQuery(exerciseId);
  const [addWorkout, result] = useAddWorkoutMutation();

  const saveWorkout = {
    userId: 1,
    data: {
      exercises: exerciseId,
    },
  };
  useEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, [name]);
  // if (isSuccess) console.log(JSON.stringify(data));
  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refetch} />}
        alwaysBounceVertical={false}
        bouncesZoom={false}
      >
        <NetworkRequest error={error} data={data} isLoading={isLoading}>
          <View style={{ alignItems: 'center', marginBottom: 100 }}>
            {data?.image_large?.map((item) => (
              <Image
                style={styles.image}
                key={item.id}
                source={{ uri: item.url }}
                resizeMode="contain"
              />
            ))}

            <View style={styles.row}>
              {data?.image_small?.map((item) => (
                <Image
                  style={styles.image2}
                  key={item.id}
                  source={{ uri: item.url }}
                  resizeMode="contain"
                />
              ))}
            </View>
            {data?.video != null ? (
              <Video
                ref={video}
                style={styles.video}
                source={{
                  uri: data?.video.url,
                }}
                useNativeControls
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
            ) : null}
            <View style={styles.textContainer}>
              <Text style={styles.category}>{data?.exercise_category?.name}</Text>
              <Text style={styles.heading}>{data?.name}</Text>
              <Text style={styles.body}>{data?.description}</Text>
            </View>
            <Button
              onPress={() => addWorkout(STRAPI_ADD_WORKOUT(exerciseId))}
              title="SAVE WORKOUT"
              fill="#000"
              color="#fff"
              isLoading={result.isLoading}
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
        </NetworkRequest>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    marginBottom: Mixins.scaleSize(17.5),
    backgroundColor: '#eee',
    borderRadius: 15,
    overflow: 'hidden',
    marginHorizontal: 0,
  },
  image2: {
    width: Mixins.scaleSize(162.5),
    height: Mixins.scaleSize(162.5),

    backgroundColor: '#eee',
    overflow: 'hidden',
    borderRadius: 15,
    marginBottom: Mixins.scaleSize(17.5),
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Mixins.scaleSize(340),
    justifyContent: 'space-between',
  },
  video: {
    alignSelf: 'center',
    width: Mixins.scaleSize(340),
    height: Mixins.scaleSize(191.25),

    backgroundColor: '#eee',
    borderRadius: 15,
    marginBottom: Mixins.scaleSize(17.5),
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
