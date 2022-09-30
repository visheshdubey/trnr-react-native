import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from './screen/Welcome';
import SignIn from './screen/SignIn';
import SignUp from './screen/SignUp';
import BaseTabNav from './BaseTabNav';
import { Typography } from './styles';
import Test from './screen/Test';
import SearchScreen from './screen/SearchScreen';

const HomeStack = createNativeStackNavigator();

const BaseStackNav = () => {
  return (
    // App Core Navigation wrapper i.e stack
    <NavigationContainer screenOptions={{ animationEnabled: false }}>
      <HomeStack.Navigator
        screenOptions={{
          animationEnabled: false,
          headerTitleStyle: {
            fontFamily: Typography.FONT_FAMILY_HEADING,
            fontSize: Typography.FONT_SIZE_24,
          },
        }}
      >
        {/* <HomeStack.Screen
          name="Test"
          component={Test}
          options={{ headerShown: false, gestureDirection: 'horizontal' }}
        /> */}
        <HomeStack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false, gestureDirection: 'horizontal' }}
        />
        <HomeStack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false, animationEnabled: false }}
        />
        <HomeStack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false, animationEnabled: false }}
        />
        {/* Calling Bottom Tab Navigation */}
        <HomeStack.Screen
          name="BaseTabNav"
          component={BaseTabNav}
          options={{ headerShown: false, animationEnabled: false }}
        />
        <HomeStack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{ headerShown: false, gestureDirection: 'horizontal' }}
        />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default BaseStackNav;
