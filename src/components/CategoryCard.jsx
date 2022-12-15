import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Mixins, Typography } from '../styles';
import { LOG } from '../utils/ApiConstants';
import ProgressiveImage from './ProgressiveImage';

const backdrop = require('../assets/images/cardGradient.png');
const CategoryCard = ({ item, style, onPress }) => {
  if (LOG === true) console.log('🚀 ~ file: CategoryCard.jsx ~ line 8 ~ CategoryCard ~ CategoryCard', 'Category Card Rendered');
  return (
    <View style={[styles.container, style]}>
      <Pressable onPress={onPress}>
        <ProgressiveImage styles={styles} image={item.image} blur_image={item.blur_image} text={item.name} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  backdrop: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: Mixins.moderateScale(20),
    paddingBottom: Mixins.moderateScale(15),
  },
  imageStyles: {
    borderRadius: Mixins.moderateScale(10),
    width: Mixins.WINDOW_WIDTH,
    height: Mixins.scaleSize(150),
    backgroundColor: '#eee',
  },
  default: {
    position: 'absolute',
    width: Mixins.WINDOW_WIDTH,
    height: Mixins.scaleSize(150),
    bottom: 0,
    borderRadius: 15,
  },
  text: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    color: '#fff',
    fontSize: Typography.FONT_SIZE_24,
  },
});

export default CategoryCard;
