import React, { useState, useEffect } from 'react';
import { LogBox, View, Text } from 'react-native';

import { useFonts } from 'expo-font';
import BaseStackNav from './BaseStackNav';
import SplashScreen from './screen/SplashScreen';

import { Provider } from 'react-redux';
import { store } from './store';

const App = () => {
  return (
    <Provider store={store}>
      <SplashScreenComponent />
    </Provider>
  );
};

const SplashScreenComponent = () => {
  //   LogBox.ignoreAllLogs();
  const [show, setShow] = useState(true);
  const [fontsLoaded, error] = useFonts({
    'BlankRiver-Bold': require('./assets/fonts/BlankRiver-Bold.ttf'),
    'BebasNeuePro-Regular': require('./assets/fonts/BebasNeuePro-Regular.otf'),
    'BebasNeuePro-Bold': require('./assets/fonts/BebasNeuePro-Bold.otf'),
  });
  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {show ? fontsLoaded ? <SplashScreen /> : <></> : <BaseStackNav />}
    </View>
  );
};

export default App;
