import React from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import CategoryCard from "../../components/CategoryCard";
import { Typography } from "../../styles";
import Icon from "react-native-vector-icons/FontAwesome5";
const items = [
  {
    id: "1",
    name: "BALANCE AND AGILITY",
    image: "../assets/images/card1.png",
  },
  {
    id: "2",
    name: "STRENGTH",
    image: "../assets/images/card2.png",
  },
  {
    id: "3",
    name: "MASSAGE RECOVERY",
    image: "../assets/images/card3.png",
  },
  {
    id: "4",
    name: "HAND THERAPY",
    image: "../assets/images/card3.png",
  },
];
const CategoryView = ({ navigation }) => {
  const handleClick = (x, y) => {
    navigation.navigate(x, { name: y });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Icon name=""></Icon>
      <View>
        <Text style={styles.searchBar}>SEARCH FOR A PRODUCT OR WORKOUT</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{ width: "100%" }}
      >
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
            marginBottom: 80,
          }}
        >
          <Text style={styles.heading}>BEGIN YOUR </Text>
          <Text style={[styles.heading_2, {}]}>JOURNEY </Text>

          {items.map((item) => (
            <CategoryCard
              style={styles.item}
              categoryName={item.name}
              key={item.id}
              onPress={() => handleClick("ExerciseScreen", "Product")}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:"center",
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  item: {
    marginVertical: 5,
    borderRadius: 10,
    width: "100%",
  },
  searchBar: {
    minWidth: "90%",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontFamily: Typography.FONT_FAMILY_BODY,
    letterSpacing: 0.7,
    color: "#aaa",
  },
  heading: {
    fontFamily: Typography.FONT_FAMILY_BODY,
    fontSize: 36,
  },
  heading_2: {
    fontFamily: Typography.FONT_FAMILY_DISPLAY,
    fontSize: Typography.FONT_SIZE_56,
    marginTop: -10,
  },
});

export default CategoryView;
