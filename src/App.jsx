import React, { useState, useEffect } from 'react';
import { LogBox, View, Text, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import BaseStackNav from './BaseStackNav';
import SplashScreen from './screen/SplashScreen';

import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import { getDataObject, storeDataObject } from './services/local';

import { logout, signin } from './services/features/userSlice';
import { LOG } from './utils/ApiConstants';
import moment from 'moment/moment';

// moment
const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SplashScreenComponent />
      </SafeAreaProvider>
    </Provider>
  );
};

const SplashScreenComponent = () => {
  const dispatch = useDispatch();
  const getLocal = async () => await getDataObject();
  const setLocal = async (data) => {
    await storeDataObject(data);
  };
  const handleLogout = () => {
    dispatch(logout());
    setLocal({});
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await getLocal();
      if (data) {
        console.log(JSON.stringify(data));
        dispatch(signin(data));
      }
    };
    loadData();
  }, []);
  // LogBox.ignoreAllLogs();
  const [show, setShow] = useState(false);
  const [fontsLoaded, error] = useFonts({
    'BlankRiver-Bold': require('./assets/fonts/BlankRiver-Bold.ttf'),
    'BebasNeuePro-Regular': require('./assets/fonts/BebasNeuePro-Regular.otf'),
    'BebasNeuePro-Bold': require('./assets/fonts/BebasNeuePro-Bold.otf'),
  });
  useEffect(() => {
    if (fontsLoaded) setShow(true);
    if (LOG === true) console.log('🚀 ~ file: App.jsx ~ line 42 ~ useEffect ~ fontsLoaded', fontsLoaded);
  }, [fontsLoaded]);

  return <View style={{ flex: 1 }}>{!show ? <SplashScreen /> : <BaseStackNav />}</View>;
};

export default App;
