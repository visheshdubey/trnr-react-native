import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { Mixins, Typography } from '../styles';

import { useNavigation } from '@react-navigation/native';

const image = require('../assets/images/dummy.jpg');

function Search_Item({ item, style }) {
  const navigation = useNavigation();
  // console.log(props);

  return (
    <View style={[styles.separator, style]} key={item.id}>
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          navigation.navigate('HS_ExerciseDetailScreen', {
            name: item.exercise,
            exerciseId: item.id,
          })
        }
      >
        <Image style={styles.imageStyles} source={{ uri: item.image }} resizeMode="cover" />
        <View>
          <Text style={styles.exercise}>{item.exercise}</Text>
          <Text style={styles.productName}>{item.productName}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Mixins.scaleSize(340),
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Mixins.scaleSize(10),
    height: Mixins.scaleSize(60),
  },
  imageStyles: {
    width: Mixins.scaleSize(60),
    height: Mixins.scaleSize(60),
    borderRadius: 5,
    marginRight: Mixins.scaleSize(10),
    backgroundColor: '#eee',
  },
  exercise: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_18,
  },
  productName: {
    fontFamily: Typography.FONT_FAMILY_BODY,
    fontSize: Typography.FONT_SIZE_16,
    color: '#aaa',
  },
  // textBox:{
  //   fl
  // }
  separator: { flex: 1, borderBottomWidth: 1, borderColor: '#eee' },
});

export default Search_Item;
