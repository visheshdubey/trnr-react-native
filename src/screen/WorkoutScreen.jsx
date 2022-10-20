import React, { useState } from 'react';
import {
  RefreshControl,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import NetworkRequest from '../components/NetworkRequest';
import Workout_Item from '../components/Workout_Item';
import { useGetWorkoutsListQuery } from '../services/strapi';
import { Mixins } from '../styles';
import { WHITE } from '../styles/colors';

// NetworkRequest
const MyWorkout = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, error, isLoading, refetch } = useGetWorkoutsListQuery(1);
  // const { categoryId } = route.params;
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
    marginBottom: Mixins.scaleSize(70),
  },
});

export default MyWorkout;
