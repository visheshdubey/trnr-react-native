import { Typography } from '../../styles';
import HS_CategoryScreen from './HS_CategoryScreen';
import HS_ExerciseView from './NAV_ExerciseScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HS_ExerciseDetailScreen from './HS_ExerciseDetailScreen';
import HS_ProductScreen from './HS_ProductScreen';
import NAV_ExerciseScreen from './NAV_ExerciseScreen';

const Stack = createNativeStackNavigator();
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
    </Stack.Navigator>
  );
};

export default NAV_HomeScreen;
