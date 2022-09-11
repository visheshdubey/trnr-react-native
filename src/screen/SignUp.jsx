import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, TextInput, Text, View } from "react-native";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { Typography } from "../styles";
import DatePicker from "../components/DatePicker";

const SignUp = ({ navigation, route }) => {
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);

  const handleClick = (x, y) => {
    navigation.navigate(x, { name: y });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Text style={styles.heading}>LET'S BECOME A </Text>
        <Text style={[styles.heading_2, {}]}>MEMBER </Text>
      </View>

      <Text style={[styles.body, { marginTop: 5 }]}>
        AND RECIEVE THOUSANDS OF BENEFITS
      </Text>
      <TextInput
        style={[styles.input, { width: "90%", marginTop: 50 }]}
        onChangeText={onChangeText}
        value={text}
      />
      <View
        style={{
          width: "90%",
          flexDirection: "row",
          // flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextInput
          style={[styles.input, { width: "48%" }]}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="FIRST NAME"
          // keyboardType="password"
          secureTextEntry={true}
        />
        <TextInput
          style={[styles.input, { width: "48%" }]}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="LAST NAME"
          // keyboardType="password"
          secureTextEntry={true}
        />
      </View>
      <TextInput
        style={[styles.input, { width: "90%" }]}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="PASSWORD"
        // keyboardType="password"
        secureTextEntry={true}
      />
      <TextInput
        style={[styles.input, { width: "90%" }]}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="DATE"
        // keyboardType="password"
        // secureTextEntry={true}
      />
      <DatePicker style={{ width: "90%" }}></DatePicker>

      <Button
        onPress={() => handleClick("HomeNavigation", "HomeScreen")}
        title="BEGIN"
        fill="#000"
        color="#fff"
        style={{ marginTop: 50 }}
      ></Button>
      <Text style={styles.body}>ALREADY MEMEBER SIGN-IN</Text>
    </SafeAreaView>
  );
};

export default SignUp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 70,
  },
  heading: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: 28,
  },
  heading_2: {
    fontFamily: Typography.FONT_FAMILY_DISPLAY,
    fontSize: 32,
  },
  body: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
  },
  input: {
    fontFamily: Typography.FONT_FAMILY_HEADING,

    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
  },
});
