import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Mixins, Typography } from "../styles";

const image = require("../assets/images/card1.png");
const backdrop = require("../assets/images/cardGradient.png");
const CategoryCard = ({categoryName, style, onPress}) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress}>
        <Image style={styles.imageStyles}source={image} resizeMode="cover"></Image>
        <Image
          style={styles.backdrop}
          source={backdrop}
          resizeMode="cover"
        ></Image>
        <View style={[styles.backdrop]}>
          <Text style={[styles.text, { fontSize: Typography.FONT_SIZE_16 }]}>
            CATEGORY
          </Text>
          <Text style={[styles.text, { fontSize: Typography.FONT_SIZE_24 }]}>
            {categoryName}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    overflow:"hidden"
  },
  backdrop: {
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  imageStyles:{
    borderRadius:10
  },
  text: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    color: "#fff",
  },
});

export default CategoryCard;
