import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from './screen/Welcome';
import SignIn from './screen/SignIn';
import SignUp from './screen/SignUp';
import BaseTabNav from './BaseTabNav';
import { Typography } from './styles';
import SearchScreen from './screen/SearchScreen';
import { useSelector } from 'react-redux';
import PolicyScreen from './screen/PolicyScreen';
import CountrySelectorScreen from './screen/CountrySelectorScreen';
import ResetScreen from './screen/ResetScreen';
import Confirmation from './screen/Confirmation';
const HomeStack = createNativeStackNavigator();

const BaseStackNav = () => {
  const isSignnedIn = useSelector((state) => state.user.isSignnedIn);
  return (
    // App Core Navigation wrapper i.e stack
    <NavigationContainer>
      <HomeStack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerShown: false,
          headerBackTitleVisible: false,
          headerTintColor: 'black',
          headerTitleStyle: {
            fontFamily: Typography.FONT_FAMILY_HEADING,
            fontSize: Typography.FONT_SIZE_24,
          },
        }}
      >
        {isSignnedIn ? (
          <>
            {/* <HomeStack.Screen name="APPLICATION PRIVACY POLICY" component={PolicyScreen} options={{ headerShown: true }} /> */}
            <HomeStack.Screen name="BaseTabNav" component={BaseTabNav} />
            <HomeStack.Screen name="SearchScreen" component={SearchScreen} />
          </>
        ) : (
          <>
            <HomeStack.Screen name="Welcome" component={Welcome} />
            <HomeStack.Screen name="SignIn" component={SignIn} />
            <HomeStack.Screen name="SignUp" component={SignUp} />
            <HomeStack.Screen name="Confirmation" component={Confirmation} options={{ headerShown: true, title: ' ', headerShadowVisible: false }} />
            <HomeStack.Screen name="TERMS AND CONDITIONS" component={PolicyScreen} options={{ headerShown: true }} />
          </>
        )}
        <HomeStack.Screen
          name="ResetScreen"
          component={ResetScreen}
          options={{
            title: 'RESET PASSWORD',
            // headerShadowVisible: true,
            headerShown: true,
          }}
        />
        <HomeStack.Screen name="Country" component={CountrySelectorScreen} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default BaseStackNav;
