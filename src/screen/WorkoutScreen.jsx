import React, { useState } from 'react';
import { RefreshControl, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import NetworkRequest from '../components/NetworkRequest';
import Workout_Item from '../components/Workout_Item';
import { useGetWorkoutsListQuery } from '../services/strapi';
import { Mixins } from '../styles';
import { WHITE } from '../styles/colors';
import { LOG } from '../utils/ApiConstants';

// NetworkRequest
const MyWorkout = () => {
  const [refreshing, setRefreshing] = useState(false);
  const userId = useSelector((state) => state.user.customerID);
  if (LOG === true) console.log('🚀 ~ file: WorkoutScreen.jsx ~ line 14 ~ MyWorkout ~ userId', userId);

  const { data, error, isLoading, refetch } = useGetWorkoutsListQuery(userId);

  if (LOG === true) console.log('🚀 ~ file: WorkoutScreen.jsx ~ line 18 ~ MyWorkout ~ JSON.stringify(data?.exercises.length)', JSON.stringify(data?.exercises.length));
  if (LOG === true) console.log('🚀 ~ file: WorkoutScreen.jsx ~ line 18 ~ MyWorkout ~ JSON.stringify(error)', JSON.stringify(error));
  return (
    <SafeAreaView style={styles.container}>
      <NetworkRequest error={error} data={data} isLoading={isLoading}>
        <FlatList
          style={styles.list}
          data={data?.exercises}
          extraData="hello"
          renderItem={(props) => <Workout_Item {...props} />} //We have to use this syntax if we want to use hooks inside the rendered component
          keyExtractor={(item) => item.id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refetch} />}
        />
      </NetworkRequest>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: 'center',
  },
  list: {
    width: Mixins.scaleSize(340),
    marginBottom: Mixins.moderateScale(50),
  },
});

export default MyWorkout;
