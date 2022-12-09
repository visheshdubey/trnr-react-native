import { Typography } from '../../styles';
import { createNativeStackNavigator, cardStyleInterpolator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { Animated } from 'react-native';
import { CardStyleInterpolators } from '@react-navigation/stack';
import PolicyScreen from '../PolicyScreen';
import MyAccount from './MyAccount';
import ProfileMenu from './ProfileMenu';
import About from './About';
import Privacy from './Privacy';
import MyAcc from './MyAcc';
// Animated
const Stack = createNativeStackNavigator();
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const forSlide = ({ current, next, inverted, layouts: { screen } }) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
      : 0
  );

  return {
    cardStyle: {
      transform: [
        {
          translateX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [
                screen.width, // Focused, but offscreen in the beginning
                0, // Fully focused
                screen.width * -0.3, // Fully unfocused
              ],
              extrapolate: 'clamp',
            }),
            inverted
          ),
        },
      ],
    },
  };
};
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
          headerShown: true,
          headerTitleStyle: {
            fontFamily: Typography.FONT_FAMILY_BODY,
            fontSize: Typography.FONT_SIZE_20,
          },
        }}
      />
      <Stack.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          title: 'MY ACCOUNT',
          headerShadowVisible: true,
          headerShown: true,
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
        name="APPLICATION_TNC"
        component={PolicyScreen}
        options={{
          title: 'TERMS AND CONDITION',
          headerShadowVisible: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default NAV_ProfileScreen;
