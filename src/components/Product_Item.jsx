import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { Mixins, Typography } from '../styles';

import { useNavigation } from '@react-navigation/native';

function Product_Item({ item }) {
  const navigation = useNavigation();
  // console.log(props);

  return (
    <View style={styles.separator} key={item.id}>
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          navigation.navigate('NAV_ExerciseScreen', {
            categoryName: item.name,
            productId: item.id,
          })
        }
      >
        <Image style={styles.imageStyles} source={{ uri: item.image }} resizeMode="cover" />
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Mixins.WINDOW_WIDTH,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Mixins.scaleSize(8),
    height: Mixins.scaleSize(104),
  },
  imageStyles: {
    width: Mixins.scaleSize(104),
    height: Mixins.scaleSize(104),
    borderRadius: 5,
    marginRight: Mixins.scaleSize(10),
    backgroundColor: '#eee',
  },
  text: {
    fontFamily: Typography.FONT_FAMILY_BODY,
    fontSize: Typography.FONT_SIZE_18,
  },
  separator: { flex: 1, borderBottomWidth: 1, borderColor: '#eee' },
});

export default Product_Item;
