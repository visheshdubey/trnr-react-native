import React from 'react';
import { View, StyleSheet, SafeAreaView, FlatList, Text, ActivityIndicator } from 'react-native';
import Workout_Item from '../components/Workout_Item';
import { useGetProductQuery } from '../services/Products';
import { Mixins } from '../styles';
import { WHITE } from '../styles/colors';
const MyWorkout = () => {
  const { data, error, isLoading } = useGetProductQuery();
  // const { categoryId } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      {error ? (
        <Text>Oh no, there was an error = </Text>
      ) : isLoading ? (
        <ActivityIndicator color="#000" />
      ) : data ? (
        <>
          <FlatList
            style={styles.list}
            data={data}
            extraData="hello"
            renderItem={(props) => <Workout_Item {...props} />} //We have to use this syntax if we want to use hooks inside the rendered component
            keyExtractor={(item) => item.id}
          />
        </>
      ) : null}
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
