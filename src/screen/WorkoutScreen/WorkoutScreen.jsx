import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import React, { useState } from 'react';
import { RefreshControl, StyleSheet, SafeAreaView, FlatList, Text, Image, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import NetworkRequest from '../../components/NetworkRequest';
import SnackBar from '../../components/SnackBar';
import Workout_Item from '../../components/Workout_Item';
import { workoutSnack } from '../../services/features/snackBarSlice';
import { useGetWorkoutsListQuery } from '../../services/strapi';
import { Mixins, Typography } from '../../styles';
import { WHITE } from '../../styles/colors';
import { moderateScale } from '../../styles/mixins';
// NetworkRequest
const WS_WorkoutScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const userId = useSelector((state) => state.user.customerID);
  const bottomTabHeight = useBottomTabBarHeight();
  const headerHeight = useHeaderHeight();
  const dispatch = useDispatch();
  const snackState = useSelector((state) => state.snackBar.workoutSnack);

  const { data, error, isLoading, refetch } = useGetWorkoutsListQuery();
  return (
    <SafeAreaView style={styles.container}>
      <NetworkRequest error={error} data={data} isLoading={isLoading}>
        {data?.exercises?.length > 0 ? (
          <FlatList
            style={styles.list}
            data={data?.exercises}
            extraData="hello"
            renderItem={(props) => <Workout_Item {...props} />} //We have to use this syntax if we want to use hooks inside the rendered component
            keyExtractor={(item) => item.id}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refetch} />}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: bottomTabHeight, marginTop: -headerHeight }}>
            <View style={{ alignItems: 'center' }}>
              <Image source={require('../../assets/images/Vector.png')} style={{ width: Mixins.scaleSize(90), height: Mixins.scaleSize(90) }} resizeMode="contain" />
              <Text style={{ fontFamily: Typography.ROBOTO_BODY, fontSize: Typography.FONT_SIZE_14, marginTop: 15 }}> Your saved workouts will appear here</Text>
            </View>
            <Button onPress={() => navigation.navigate('HomeScreen')} title="BROWSE WORKOUTS" fill="#000" color="white" style={{ position: 'absolute', bottom: moderateScale(30) }} />
          </View>
        )}
        <SnackBar state={snackState} text="REMOVED FROM MY WORKOUTS" />
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

export default WS_WorkoutScreen;
