import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Image, Text } from 'react-native';
import { Mixins, Typography } from '../styles';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDeleteWorkoutMutation } from '../services/strapi';
import { ActivityIndicator } from 'react-native';
import { STRAPI_DELETE_WORKOUT } from '../utils/ApiConstants';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import SnackBar from './SnackBar';
import { workoutSnack } from '../services/features/snackBarSlice';
// SnackBar
const WorkoutCard = ({ item }, props) => {
  const navigation = useNavigation();
  const [deleteWorkout, result] = useDeleteWorkoutMutation();
  const userId = useSelector((state) => state.user.customerID);
  const dispatch = useDispatch();
  const [snackState, setSnackState] = useState('NO');
  //   const state = useRef('NO').current;
  const openSnackBar = () => {
    setSnackState('ENTER');
    setTimeout(() => {
      setSnackState('EXIT');
    }, 3500);
  };
  useEffect(()=>{
return dispatch(workoutSnack('EXIT'));
  },[])
  useEffect(() => {
    result.isSuccess && openSnackBar();
  }, [result.isSuccess]);
  return (
    <View style={styles.separator} key={item.id}>
      <Pressable style={styles.container} onPress={() => navigation.navigate('ExerciseDetailScreen_Workout', { name: item.name, exerciseId: item.id })}>
        <FastImage style={styles.imageStyles} source={{ uri: item.image }} resizeMode="cover" fallback={true} />
        <View style={styles.text_icon}>
          <View style={{ flex: 6 }}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.category}>{item.product}</Text>
          </View>
          <Pressable
            style={{
              flex: 1,
              paddingHorizontal: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              deleteWorkout(STRAPI_DELETE_WORKOUT(item.id));
              dispatch(workoutSnack('ENTER'));
              setTimeout(() => {
                dispatch(workoutSnack('EXIT'));
              }, 2000);
            }}
          >
            {result.isLoading ? <ActivityIndicator color="red" /> : <Icon name="delete" color="red" size={Mixins.moderateScale(18)} />}
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Mixins.scaleSize(340),
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Mixins.moderateScale(8),
    height: Mixins.moderateScale(104),
    // backgroundColor: 'green',
  },
  text_icon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  imageStyles: {
    width: Mixins.moderateScale(104, 0.1),
    height: Mixins.moderateScale(104, 0.1),
    borderRadius: 5,
    marginRight: Mixins.moderateScale(10, 0.1),
    backgroundColor: '#eee',
  },
  name: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_18,
  },
  category: {
    fontFamily: Typography.FONT_FAMILY_BODY,
    fontSize: Typography.FONT_SIZE_16,
    color: '#101010',
  },
  separator: { flex: 1, borderBottomWidth: 1, borderColor: '#eee' },
});
export default WorkoutCard;
