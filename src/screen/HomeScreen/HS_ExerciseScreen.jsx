import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import ExerciseCard from '../../components/ExerciseCard';
import NetworkRequest from '../../components/NetworkRequest';
import { useGetExerciseCategoryQuery } from '../../services/Products';
import { Mixins } from '../../styles';
const HS_ExerciseScreen = ({ navigation, route }) => {
  const { productId, categoryId } = route.params;

  const endpoint = `${productId}/${categoryId}`; //This has to be done because RTK dosen't accepts two params
  console.log(endpoint);
  const { error, data, isLoading } = useGetExerciseCategoryQuery(endpoint);

  return (
    <SafeAreaView style={styles.container}>
      <NetworkRequest error={error} data={data} isLoading={isLoading}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{ width: Mixins.scaleSize(365) }}
        >
          <View style={styles.grid}>
            {data?.map((item) => (
              <ExerciseCard
                style={styles.item}
                item={item}
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
    width: Mixins.scaleSize(400),
    alignItems: 'center',
    marginBottom: Mixins.scaleSize(80),
  },
  item: {
    margin: Mixins.scaleSize(5),
  },
});

export default HS_ExerciseScreen;
