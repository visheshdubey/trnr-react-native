import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image, FlatList } from 'react-native';
import ExerciseCard from '../../components/ExerciseCard';
import NetworkRequest from '../../components/NetworkRequest';
import { useGetExerciseCategoryQuery } from '../../services/strapi';
import { Mixins } from '../../styles';

const HS_ExerciseScreen = ({ navigation, route }) => {
  const { productId, categoryId } = route.params;
  const [dataLength, setDataLength] = useState(172.5);
  const bottomTabHeight = useBottomTabBarHeight();
  const endpoint = `${productId}/${categoryId}`; //This has to be done because RTK dosen't accepts two params
  const { error, data, isLoading, isSuccess } = useGetExerciseCategoryQuery(endpoint);

  const GRID_THRESHOLD = 6; //Layout will switch to grid, if there are more than GRID_THRESHOLD items to render

  useEffect(() => {
    isSuccess ? (data?.length <= GRID_THRESHOLD ? setDataLength(340) : setDataLength(172.5)) : null;
  }, [data]);

  return (
    <SafeAreaView style={[styles.container, { marginBottom: bottomTabHeight }]}>
      <NetworkRequest error={error} data={data} isLoading={isLoading}>
        <FlatList
          data={data}
          numColumns={data?.length > GRID_THRESHOLD ? 2 : 1}
          renderItem={(props) => (
            <ExerciseCard
              style={{
                margin: Mixins.moderateScale(5),
                width: Mixins.moderateScale(dataLength),
                height: Mixins.moderateScale(dataLength),
              }}
              {...props}
            />
          )}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </NetworkRequest>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Mixins.moderateScale(10),
    // alignItems: 'center',
    backgroundColor: '#fff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Mixins.WINDOW_WIDTH,
    backgroundColor: 'red',
    marginBottom: Mixins.moderateScale(80),
  },
});

export default HS_ExerciseScreen;
