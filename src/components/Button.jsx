import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ActivityIndicator, Pressable } from 'react-native';
import { Mixins, Typography } from '../styles';

function Button({ onPress, title, fill, style, color, isLoading }) {
  return (
    //
    <View style={[style]}>
      <Pressable style={styles.container} onPress={onPress}>
        <View
          style={[
            styles.btnBackground,
            {
              backgroundColor: fill,
            },
          ]}
        ></View>
        {isLoading ? <ActivityIndicator color={color} style={[styles.text, { borderWidth: 0 }]} /> : <Text style={[styles.text, { color: color }]}>{title}</Text>}
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  btnBackground: {
    width: Mixins.scaleSize(275),
    height: Mixins.scaleSize(47),
    borderRadius: Mixins.scaleSize(47),
  },
  text: {
    position: 'absolute',
    width: Mixins.scaleSize(275),
    height: Mixins.scaleSize(47),
    textAlign: 'center',
    lineHeight: Mixins.scaleSize(47),
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_16,
  },
});

export default Button;
