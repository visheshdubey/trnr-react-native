import { Typography } from '../../styles';
import CategoryView from './HS_CategoryScreen';
import HS_ExerciseView from './NAV_ExerciseScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HS_ExerciseDetailScreen from './HS_ExerciseDetailScreen';
const Stack = createNativeStackNavigator();
const HomeScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: Typography.FONT_FAMILY_HEADING,
          fontSize: Typography.FONT_SIZE_24,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={CategoryView}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <Stack.Screen
        name="ExerciseScreen"
        component={HS_ExerciseView}
        options={{
          title: 'BALANCE TRAINER',
          headerShown: true,
          animationEnabled: false,
          headerStyle: {
            alignItems: 'center',
          },
        }}
      />
      <Stack.Screen
        name="SinglePushUp"
        component={HS_ExerciseDetailScreen}
        options={{
          title: 'SinglePushUp',
          headerShown: true,
          animationEnabled: false,
          headerStyle: {
            alignItems: 'center',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeScreen;
