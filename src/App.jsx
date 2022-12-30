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
import * as ScreenOrientation from 'expo-screen-orientation';
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
    const setOrient = async () => {
      // await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
    setOrient();
    const loadData = async () => {
      const data = await getLocal();
      if (data) {
        dispatch(signin(data));
      }
    };
    loadData();
  }, []);
  LogBox.ignoreAllLogs();
  const [show, setShow] = useState(false);
  const [fontsLoaded, error] = useFonts({
    'BlankRiver-Bold': require('./assets/fonts/BlankRiver-Bold.ttf'),
    'BebasNeuePro-Regular': require('./assets/fonts/BebasNeuePro-Regular.otf'),
    'BebasNeuePro-Bold': require('./assets/fonts/BebasNeuePro-Bold.otf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });
  useEffect(() => {
    if (fontsLoaded) setShow(true);
  }, [fontsLoaded]);

  return <View style={{ flex: 1 }}>{!show ? <SplashScreen /> : <BaseStackNav />}</View>;
};

export default App;
