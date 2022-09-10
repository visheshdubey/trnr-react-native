import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Welcome from './screen/Welcome';
import SignIn from './screen/SignIn';
import SignUp from './screen/SignUp';
import HomeScreen from './screen/HomeScreen';


const HomeStack = createNativeStackNavigator();

const BaseStack = () => {
  return (
    <NavigationContainer screenOptions={{animationEnabled: false}}>
      <HomeStack.Navigator screenOptions={{animationEnabled: false}}>
      <HomeStack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false, animationEnabled: false}}
        />
        <HomeStack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false, animationEnabled: false}}
        />
        <HomeStack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false, animationEnabled: false}}
        />
        <HomeStack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false, animationEnabled: false}}
        />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default BaseStack;