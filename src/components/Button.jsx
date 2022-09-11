import React from "react";
import Svg, { Circle, Rect, Path } from "react-native-svg";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Text,
  Pressable,
} from "react-native";
import { Typography } from "../styles";

function Button({ onPress, title, fill, color, style }) {
  return (
    //
    <View style={[style, { maxWidth: 400 }]}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Svg xmlns="http://www.w3.org/2000/svg" width="275" height="40">
          <Path
            data-name="Rectangle 2"
            d="M0 0h275v27.931l-13.234 12.073H0Z"
            fill={fill}
          />
        </Svg>
        <Text style={[styles.text, { color: color }]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
    borderRadius: 1,
    paddingHorizontal: 100,
    paddingVertical: 7,
  },
  text: {
    position: "absolute",
    top: 15,
    left: 206,
    right: 16,
    bottom: 0,
    paddingTop: 4,
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_16,
  },
});

export default Button;
