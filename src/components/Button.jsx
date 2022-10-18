import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { StyleSheet, TouchableOpacity, View, Text, Image, ActivityIndicator } from 'react-native';
import { Mixins, Typography } from '../styles';

function Button({ onPress, title, fill, style, color, isLoading }) {
  const variant =
    color == '#fff'
      ? require('../assets/images/000_btn_2.png')
      : require('../assets/images/fff_btn_2.png');
  return (
    //
    <View style={[style]}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        {/* <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={Mixins.scaleSize(275)}
          height={Mixins.scaleSize(40)}
        >
          <Path data-name="Rectangle 2" d="M275 0H0V40H255L275 20V0Z" fill={fill} />
        </Svg> */}
        {}
        <Image
          source={variant}
          style={{
            width: Mixins.scaleSize(275),
            height: Mixins.scaleSize(47),
          }}
          width={Mixins.scaleSize(275)}
          height={Mixins.scaleSize(47)}
          resizeMode="contain"
        ></Image>

        {isLoading ? (
          <ActivityIndicator color={color} style={[styles.text, { borderWidth: 0 }]} />
        ) : (
          <Text style={[styles.text, { color: color }]}>{title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: Mixins.scaleSize(20),
    alignSelf: 'center',
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
