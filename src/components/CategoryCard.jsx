import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Mixins, Typography } from '../styles';
import { WINDOW_WIDTH } from '../styles/mixins';

// const image = require('../assets/images/card2.png');
const backdrop = require('../assets/images/cardGradient.png');
const CategoryCard = ({ item, style, onPress }) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress}>
        <Image style={styles.imageStyles} source={{ uri: item.image }} resizeMode="cover"></Image>
        <Image
          style={[styles.backdrop, { width: Mixins.WINDOW_WIDTH, height: Mixins.scaleSize(150) }]}
          source={backdrop}
          resizeMode="cover"
        ></Image>
        <View style={[styles.backdrop]}>
          {/* <Text style={[styles.text, { fontSize: Typography.FONT_SIZE_16 }]}>CATEGORY</Text> */}
          <Text style={[styles.text, { fontSize: Typography.FONT_SIZE_24 }]}>{item.name}</Text>
        </View>
      </TouchableOpacity>
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
    paddingHorizontal: Mixins.scaleSize(20),
    paddingBottom: Mixins.scaleSize(15),
  },
  imageStyles: {
    borderRadius: Mixins.scaleSize(10),
    width: Mixins.WINDOW_WIDTH,
    height: Mixins.scaleSize(150),
    backgroundColor: '#eee',
  },
  text: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    color: '#fff',
  },
});

export default CategoryCard;
