import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { Mixins, Typography } from '../styles';

import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
function Country_Item({ item, style, from }) {
  const navigation = useNavigation();
  return (
    <View style={[styles.separator, style]} key={item?.code}>
      <Pressable
        style={styles.container}
        onPress={() =>
          navigation.navigate(from, {
            location_input: item.name,
          })
        }
      >
        <View>
          <Text style={styles.country}>{item.name}</Text>
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

  country: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_18,
  },

  separator: { flex: 1, borderBottomWidth: 1, borderColor: '#eee' },
});

export default Country_Item;
