import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { Mixins, Typography } from "../styles";

const image = require("../assets/images/exercise1.png");
const backdrop = require("../assets/images/cardGradient.png");
const ExerciseRow = ({ categoryName = "BALANCE TRAINER", exerciseName1, exerciseName2, style, onPress }) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={styles.card1} onPress={onPress}>
        <Image
          style={styles.imageStyles}
          source={image}
          resizeMode="contain"
        ></Image>
        <Image
          style={styles.backdrop}
          source={backdrop}
          resizeMode="cover"
        ></Image>
        <View style={[styles.backdrop]}>
          <Text style={[styles.text, { fontSize: Typography.FONT_SIZE_16 }]}>
          {categoryName}
          </Text>
          <Text style={[styles.text, { fontSize: Typography.FONT_SIZE_24 }]}>
            {exerciseName1}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card2} onPress={onPress}>
        <Image
          style={styles.imageStyles}
          source={image}
          resizeMode="contain"
        ></Image>
        <Image
          style={styles.backdrop}
          source={backdrop}
          resizeMode="cover"
        ></Image>
        <View style={[styles.backdrop]}>
          <Text style={[styles.text, { fontSize: Typography.FONT_SIZE_16 }]}>
          {categoryName}
          </Text>
          <Text style={[styles.text, { fontSize: Typography.FONT_SIZE_24 }]}>
            {exerciseName2}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: Mixins.WINDOW_WIDTH,
    overflow: "hidden",
    flexDirection: "row",
  },
  backdrop: {
    position: "absolute",
    width: 190,
    bottom: 0,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  imageStyles: {
    aspectRatio: 1,
  },
  card1: {
    flex: 1,
    maxWidth: Mixins.WINDOW_WIDTH / 2 - 10,
    maxHeight: Mixins.WINDOW_WIDTH / 2 - 10,
    marginHorizontal: 5,

    overflow: "hidden",
  },
  card2: {
    flex: 1,
    maxWidth: Mixins.WINDOW_WIDTH / 2 - 10,
    maxHeight: Mixins.WINDOW_WIDTH / 2 - 10,
    overflow: "hidden",
    marginHorizontal: 5,
  },
  text: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    color: "#fff",
  },
});

export default ExerciseRow;
