import React, { useState, useEffect } from 'react';
import { LogBox, View, Text } from 'react-native';

import { useFonts } from 'expo-font';
import BaseStackNav from './BaseStackNav';
import SplashScreen from './screen/SplashScreen';

import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import { getDataObject } from './services/local';

import { signin } from './services/features/userSlice';

const App = () => {
  return (
    <Provider store={store}>
      <SplashScreenComponent />
    </Provider>
  );
};

const SplashScreenComponent = () => {
  const dispatch = useDispatch();
  const getLocal = async () => await getDataObject();

  useEffect(() => {
    const loadData = async () => {
      const data = await getLocal();
      dispatch(signin(data));
    };
    loadData();
  }, []);
  //   LogBox.ignoreAllLogs();
  const [show, setShow] = useState(false);
  const [fontsLoaded, error] = useFonts({
    'BlankRiver-Bold': require('./assets/fonts/BlankRiver-Bold.ttf'),
    'BebasNeuePro-Regular': require('./assets/fonts/BebasNeuePro-Regular.otf'),
    'BebasNeuePro-Bold': require('./assets/fonts/BebasNeuePro-Bold.otf'),
  });
  useEffect(() => {
    if (fontsLoaded) setShow(true);
    console.log(fontsLoaded);
  }, [fontsLoaded]);

  return <View style={{ flex: 1 }}>{!show ? <SplashScreen /> : <BaseStackNav />}</View>;
};

export default App;
