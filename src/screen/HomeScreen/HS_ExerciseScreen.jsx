import React from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import ExerciseRow from "../../components/ExerciseRow";
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
const HS_ExerciseScreen = ({ navigation }) => {
  const handleClick = (x, y) => {
    navigation.navigate(x, { name: y });
  };

  return (
    <SafeAreaView style={styles.container}>
      
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
            marginBottom: 80,
          }}
        >

          {items.map((item) => (
            <ExerciseRow
              style={styles.item}
              categoryName={item.name}
              exerciseName1="SINGLE PUSH-UP"
              exerciseName2="SINGLE PUSH-UP"
              key={item.id}
              onPress={() => handleClick("SinglePushUp", "Product")}
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
    marginTop:50,
    alignItems: "center",
    backgroundColor: "#fff",
    
  },
  item: {
    // backgroundColor:"tomato",
    marginBottom: 15,
  },
});

export default HS_ExerciseScreen;
