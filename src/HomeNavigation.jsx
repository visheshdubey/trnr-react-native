import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, BlurView, StyleSheet } from "react-native";
import HomeScreen from "./screen/HomeScreen";
import MyWorkout from "./screen/MyWorkout";
import Profile from "./screen/Profile";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import dumbbell from "react-native-vector-icons/FontAwesome5";

const Tab = createBottomTabNavigator();
const HomeNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { position: "absolute", backgroundColor: "#000" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          animationEnabled: false,
          tabBarIcon: (color, size) => {
            // <Ionicons name="home-outline" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen name="MyWorkouts" component={MyWorkout} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

// const styles = StyleSheet.create({})

export default HomeNavigation;
