import React from 'react';
import { LogBox, View, Text } from 'react-native';

import { useFonts } from "expo-font";
import BaseStackNav from './BaseStackNav';

const App = () => {
  //   LogBox.ignoreAllLogs();
  const [fontsLoaded, error] = useFonts({
    "BlankRiver-Bold": require("./assets/fonts/BlankRiver-Bold.ttf"),
    "BebasNeuePro-Regular": require("./assets/fonts/BebasNeuePro-Regular.otf"),
    "BebasNeuePro-Bold": require("./assets/fonts/BebasNeuePro-Bold.otf"),
  });
  if (!fontsLoaded) {
    return (
      <Text> Splash Screen</Text> // This is to be replaced with SplashScreen
    );
  }
  return (
    <BaseStackNav />
  );
};

export default App;