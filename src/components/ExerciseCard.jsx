import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Mixins, Typography } from '../styles';

// const image = require('../assets/images/exercise1.png');
const backdrop = require('../assets/images/cardGradient.png');
let globalSize;
const ExerciseCard = ({ style, onPress, item, size }) => {
  globalSize = size;
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={styles.card} onPress={onPress} key={item.id}>
        <Image style={styles.imageStyles} source={{ uri: item.image }} resizeMode="cover"></Image>
        <Image style={styles.backdrop} source={backdrop} resizeMode="cover"></Image>
        <View style={[styles.backdrop]}>
          {/* <Text style={[styles.text, { fontSize: Typography.FONT_SIZE_16 }]}>{item.category}</Text> */}
          <Text style={[styles.text, { fontSize: Typography.FONT_SIZE_24 }]}>{item.name}</Text>
        </View>
      </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  imageStyles: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ccc',
    borderRadius: 15,
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