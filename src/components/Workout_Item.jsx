import React from 'react';
import { View, StyleSheet, Pressable, Image, Text } from 'react-native';
import { Mixins, Typography } from '../styles';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDeleteWorkoutMutation } from '../services/strapi';
import { ActivityIndicator } from 'react-native';
import { STRAPI_DELETE_WORKOUT } from '../utils/ApiConstants';
import { useSelector } from 'react-redux';

const WorkoutCard = ({ item }, props) => {
  const navigation = useNavigation();
  const [deleteWorkout, result] = useDeleteWorkoutMutation();
  const userId = useSelector((state) => state.user.customerID);
  0;
  return (
    <View style={styles.separator} key={item.id}>
      <Pressable style={styles.container} onPress={() => navigation.navigate('HS_ExerciseDetailScreen', { name: item.name, exerciseId: item.id })}>
        <Image style={styles.imageStyles} source={{ uri: item.image }} resizeMode="cover" />
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
            onPress={() => deleteWorkout(STRAPI_DELETE_WORKOUT(userId, item.id))}
          >
            {result.isLoading ? <ActivityIndicator color="red" /> : <Icon name="delete" color="red" size={18} />}
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
    marginVertical: Mixins.scaleSize(8),
    height: Mixins.scaleSize(104),
  },
  text_icon: {
    width: Mixins.scaleSize(200),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageStyles: {
    width: Mixins.scaleSize(104),
    height: Mixins.scaleSize(104),
    borderRadius: 5,
    marginRight: Mixins.scaleSize(10),
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
