import React from 'react';
import { LogBox, View, Text } from 'react-native';
import BaseStack from './Base';

import { useFonts } from "expo-font";

const App = () => {
  //   LogBox.ignoreAllLogs();
  const [fontsLoaded, error] = useFonts({
    "BlankRiver-Bold": require("./assets/fonts/BlankRiver-Bold.ttf"),
    "BebasNeuePro-Regular": require("./assets/fonts/BebasNeuePro-Regular.otf"),
    "BebasNeuePro-Bold": require("./assets/fonts/BebasNeuePro-Bold.otf"),
  });
  if (!fontsLoaded) {
    return (
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <Text style={{ fontSize: 30 }}>Fonts not loaded {error}.</Text>
      </View>
    );
  }
  return (
    <BaseStack />
  );
};

export default App;