import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Typography, Mixins } from '../styles';
import ProgressiveImage from './ProgressiveImage';
const ExerciseCard = ({ style, item }) => {
  const navigation = useNavigation();
  return (
    <View style={[style]}>
      <Pressable
        style={styles.card}
        onPress={() =>
          navigation.navigate('HS_ExerciseDetailScreen', {
            exerciseId: item.id,
            name: item.name,
          })
        }
        key={item.id}
      >
        <ProgressiveImage styles={styles} image={item.image} blur_image={item.blur_image} text={item.name} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingHorizontal: Mixins.moderateScale(20),
    paddingBottom: Mixins.moderateScale(15),
  },
  default: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: 0,
    borderRadius: 15,
  },
  imageStyles: {
    width: '100%',
    height: '100%',
    backgroundColor: '#eee',
    borderRadius: 15,
  },
  card: {
    overflow: 'hidden',
  },
  text: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    color: '#fff',
    fontSize: Typography.FONT_SIZE_18,
  },
});

export default ExerciseCard;
