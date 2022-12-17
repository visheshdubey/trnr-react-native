import { Typography } from '../../styles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import PolicyScreen from '../PolicyScreen';
import ProfileMenu from './ProfileMenu';
import About from './About';
import Privacy from './Privacy';
import MyAcc from './MyAcc';
import ResetScreen from '../ResetScreen';
import CountrySelectorScreen from '../CountrySelectorScreen';
// Animated
const Stack = createNativeStackNavigator();

const NAV_ProfileScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerTintColor: 'black',
        headerTitleStyle: {
          fontFamily: Typography.FONT_FAMILY_HEADING,
          fontSize: Typography.FONT_SIZE_24,
        },

        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="ProfileMenu"
        component={ProfileMenu}
        options={{
          title: 'PROFILE',
          headerTitleAlign: 'left',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyAcc"
        component={MyAcc}
        options={{
          title: 'MY ACCOUNT',
          headerShadowVisible: true,
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{
          title: 'ABOUT',
          headerShadowVisible: true,
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Privacy"
        component={Privacy}
        options={{
          title: 'PRIVACY POLICY',
          headerShadowVisible: true,
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ResetScreen"
        component={ResetScreen}
        options={{
          title: 'RESET PASSWORD',
          // headerShadowVisible: true,
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="APPLICATION_TNC"
        component={PolicyScreen}
        options={{
          title: 'TERMS AND CONDITIONS',
          headerShadowVisible: true,
        }}
      />
      <Stack.Screen
        name="Country"
        component={CountrySelectorScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default NAV_ProfileScreen;
