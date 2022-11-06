import React, { useState, useEffect } from 'react';
import { LogBox, View, Text } from 'react-native';

import { useFonts } from 'expo-font';
import BaseStackNav from './BaseStackNav';
import SplashScreen from './screen/SplashScreen';

import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import { getDataObject, storeDataObject } from './services/local';

import { logout, signin } from './services/features/userSlice';
import { LOG, RENEW_ACCESS_TOKEN_VAR } from './utils/ApiConstants';
import moment from 'moment/moment';
import { useRenewAccessTokenMutation } from './services/shopify';

// moment
const App = () => {
  return (
    <Provider store={store}>
      <SplashScreenComponent />
    </Provider>
  );
};

const SplashScreenComponent = () => {
  const dispatch = useDispatch();
  const [renewAccessToken, result] = useRenewAccessTokenMutation();
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
        dispatch(signin(data));

        var duration = moment.duration(moment(data.expiresAt).diff(moment()), 'milliseconds');
        var days = duration.asDays();

        if (days < 5 && data.accessToken) {
          //Updating the Access Token
          renewAccessToken(RENEW_ACCESS_TOKEN_VAR(data.accessToken))
            .then((result) => {
              console.log(JSON.stringify(result));
              if (result.data.errors?.length > 0 || result.data.data?.customerAccessTokenRenew.userErrors.length > 0) throw new Error('Error Encountered');

              let newData = data;
              //Storing Access Token
              newData.accessToken = result.data.data?.customerAccessTokenRenew.customerAccessToken.accessToken;
              setLocal(newData);
            })
            .catch((err) => {
              handleLogout();
              console.log(err);
            });
        }
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
