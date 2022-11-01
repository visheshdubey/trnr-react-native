import React from 'react';
import { StyleSheet, Pressable, View, Text, ActivityIndicator } from 'react-native';
import { Mixins, Typography } from '../styles';

function SmallButton({ onPress, title, fill, style, color, isLoading }) {
  return (
    <View style={[style]}>
      <Pressable style={styles.container} onPress={onPress}>
        <View style={[styles.btnBackground, { borderColor: color }]}></View>

        {isLoading ? <ActivityIndicator color={color} style={[styles.text, { borderWidth: 0 }]} /> : <Text style={[styles.text, { color: color }]}>{title}</Text>}
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    borderRadius: 15,
  },
  btnBackground: {
    borderWidth: 1,
    borderRadius: 5,
    width: Mixins.scaleSize(54),
    height: Mixins.scaleSize(32),
  },
  text: {
    position: 'absolute',
    width: Mixins.scaleSize(54),
    height: Mixins.scaleSize(32),
    textAlign: 'center',
    lineHeight: Mixins.scaleSize(32),
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_16,
  },
});

export default SmallButton;
