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
import CountrySelectorScreen from './screen/CountrySelectorScreen';

const HomeStack = createNativeStackNavigator();

const BaseStackNav = () => {
  const [isSignnedIn, setstate] = React.useState(false);
  return (
    // App Core Navigation wrapper i.e stack
    <NavigationContainer>
      <HomeStack.Navigator
        screenOptions={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTintColor: 'black',
          headerTitleStyle: {
            fontFamily: Typography.FONT_FAMILY_HEADING,
            fontSize: Typography.FONT_SIZE_24,
          },
        }}
      >
        {/* <HomeStack.Screen name="Test" component={Test} /> */}
        {/* <HomeStack.Screen name="Country_Selector" component={CountrySelectorScreen} /> */}
        {/* Calling Bottom Tab Navigation */}
        {isSignnedIn ? (
          <>
            <HomeStack.Screen name="BaseTabNav" component={BaseTabNav} />
            <HomeStack.Screen name="SearchScreen" component={SearchScreen} />
          </>
        ) : (
          <>
            <HomeStack.Screen name="Welcome" component={Welcome} />
            <HomeStack.Screen name="SignIn" component={SignIn} />
            <HomeStack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default BaseStackNav;
