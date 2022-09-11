import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, BlurView, StyleSheet } from "react-native";
import HomeScreen from "./screen/HomeScreen";
import MyWorkout from "./screen/MyWorkout";
import Profile from "./screen/Profile";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Product from "./screen/Product";
import { Typography } from "./styles";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const HomeNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontFamily: Typography.FONT_FAMILY_HEADING,
          fontSize: Typography.FONT_SIZE_14,
        },
        tabBarStyle: { position: "absolute", backgroundColor: "#000" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeTabNav}
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

const HomeTabNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: false,
        // cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{ headerShown: true, animationEnabled: false }}
      />
    </Stack.Navigator>
  );
};

// const styles = StyleSheet.create({})

export default HomeNavigation;
