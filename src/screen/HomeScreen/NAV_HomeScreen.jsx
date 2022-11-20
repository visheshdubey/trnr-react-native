import { Typography } from '../../styles';
import HS_CategoryScreen from './HS_CategoryScreen';
import HS_ExerciseView from './NAV_ExerciseScreen';
import { createNativeStackNavigator, cardStyleInterpolator } from '@react-navigation/native-stack';
import HS_ExerciseDetailScreen from './HS_ExerciseDetailScreen';
import HS_ProductScreen from './HS_ProductScreen';
import NAV_ExerciseScreen from './NAV_ExerciseScreen';
import 'react-native-gesture-handler';
import { Animated } from 'react-native';
import { CardStyleInterpolators } from '@react-navigation/stack';
import PolicyScreen from '../PolicyScreen';
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
const NAV_HomeScreen = () => {
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
        name="HomeScreen"
        component={HS_CategoryScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HS_ExerciseScreen"
        component={HS_ExerciseView}
        options={{
          title: 'BALANCE TRAINER',
        }}
      />
      <Stack.Screen
        name="HS_ExerciseDetailScreen"
        component={HS_ExerciseDetailScreen}
        options={{
          title: 'HS_ExerciseDetailScreen',
        }}
      />
      <Stack.Screen
        name="NAV_ExerciseScreen"
        component={NAV_ExerciseScreen}
        options={{
          title: 'NAV_ExerciseScreen',
        }}
      />
      <Stack.Screen
        name="HS_ProductScreen"
        component={HS_ProductScreen}
        options={{
          title: 'HS_ProductScreen',
        }}
      />
      <Stack.Screen
        name="APPLICATION PRIVACY POLICY"
        component={PolicyScreen}
        options={{
          title: 'APPLICATION PRIVACY POLICY',
          headerShadowVisible: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default NAV_HomeScreen;
