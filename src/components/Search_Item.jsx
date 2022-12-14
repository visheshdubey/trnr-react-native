import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { Mixins, Typography } from '../styles';

import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
function Search_Item({ item, style }) {
  const navigation = useNavigation();

  return (
    <View style={[styles.separator, style]}>
      <Pressable
        style={styles.container}
        onPress={() =>
          navigation.navigate('HS_ExerciseDetailScreen', {
            name: item.exercise,
            exerciseId: item.id,
          })
        }
      >
        <FastImage style={styles.imageStyles} source={{ uri: item.image }} resizeMode="cover" fallback={true} />
        <View>
          <Text style={styles.exercise}>{item.exercise}</Text>
          <Text style={styles.productName}>{item.productName}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Mixins.scaleSize(340),
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Mixins.moderateScale(10),
    height: Mixins.moderateScale(60),
  },
  imageStyles: {
    width: Mixins.moderateScale(60),
    height: Mixins.moderateScale(60),
    borderRadius: 5,
    marginRight: Mixins.moderateScale(10),
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
