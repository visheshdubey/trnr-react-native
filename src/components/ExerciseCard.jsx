import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Mixins, Typography } from '../styles';

// const image = require('../assets/images/exercise1.png');
const backdrop = require('../assets/images/cardGradient.png');
const ExerciseCard = ({ style, onPress, item }) => {
  console.log(item.image);
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={styles.card} onPress={onPress} key={item.id}>
        <Image style={styles.imageStyles} source={{ uri: item.image }} resizeMode="cover"></Image>
        <Image style={styles.backdrop} source={backdrop} resizeMode="cover"></Image>
        <View style={[styles.backdrop]}>
          <Text style={[styles.text, { fontSize: Typography.FONT_SIZE_16 }]}>{item.category}</Text>
          <Text style={[styles.text, { fontSize: Typography.FONT_SIZE_24 }]}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    width: Mixins.scaleSize(172.5),
    bottom: 0,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  imageStyles: {
    width: Mixins.scaleSize(172.5),
    height: Mixins.scaleSize(172.5),
  },
  card: {
    overflow: 'hidden',
  },
  text: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    color: '#fff',
  },
});

export default ExerciseCard;
