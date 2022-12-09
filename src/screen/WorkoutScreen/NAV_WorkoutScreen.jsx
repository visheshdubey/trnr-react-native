import { Typography } from '../../styles';
import { createNativeStackNavigator, cardStyleInterpolator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { Animated } from 'react-native';
import WS_WorkoutScreen from './WorkoutScreen';
import HS_ExerciseDetailScreen from '../HomeScreen/HS_ExerciseDetailScreen';
// Animated
const Stack = createNativeStackNavigator();

const NAV_WorkoutScreen = () => {
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
        name="SAVED WORKOUTS"
        component={WS_WorkoutScreen}
        options={{
          title: 'MY WORKOUTS',
        }}
      />
      <Stack.Screen
        name="ExerciseDetailScreen_Workout"
        component={HS_ExerciseDetailScreen}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default NAV_WorkoutScreen;
