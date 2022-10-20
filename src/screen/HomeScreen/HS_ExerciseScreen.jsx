import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import ExerciseCard from '../../components/ExerciseCard';
import NetworkRequest from '../../components/NetworkRequest';
import { useGetExerciseCategoryQuery } from '../../services/strapi';
import { Mixins } from '../../styles';

const HS_ExerciseScreen = ({ navigation, route }) => {
  const { productId, categoryId } = route.params;
  const [dataLength, setDataLength] = useState(172.5);
  const endpoint = `${productId}/${categoryId}`; //This has to be done because RTK dosen't accepts two params
  const { error, data, isLoading, isSuccess } = useGetExerciseCategoryQuery(endpoint);

  const GRID_THRESHOLD = 6; //Layout will switch to grid, if there are more than GRID_THRESHOLD items to render

  useEffect(() => {
    isSuccess ? (data?.length < 6 ? setDataLength(340) : setDataLength(172.5)) : null;
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      <NetworkRequest error={error} data={data} isLoading={isLoading}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{ width: Mixins.scaleSize(375) }}
        >
          <View style={styles.grid}>
            {data?.map((item) => (
              <ExerciseCard
                style={{
                  margin: Mixins.scaleSize(5),
                  width: Mixins.scaleSize(dataLength),
                  height: Mixins.scaleSize(dataLength),
                }}
                item={item}
                size={340}
                key={item.id}
                onPress={() =>
                  navigation.navigate('HS_ExerciseDetailScreen', {
                    exerciseId: item.id,
                    name: item.name,
                  })
                }
              />
            ))}
          </View>
        </ScrollView>
      </NetworkRequest>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Mixins.scaleSize(10),
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Mixins.WINDOW_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Mixins.scaleSize(80),
  },
});

export default HS_ExerciseScreen;
