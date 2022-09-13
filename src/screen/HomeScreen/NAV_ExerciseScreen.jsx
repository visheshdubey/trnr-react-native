import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HS_ExerciseScreen from './HS_ExerciseScreen';
import { Typography } from '../../styles';
const Tab = createMaterialTopTabNavigator();

const HS_ExerciseView = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        headerTitleStyle: {
          fontFamily: Typography.FONT_FAMILY_HEADING,
          fontSize: Typography.FONT_SIZE_24,
        },
        tabBarIndicatorStyle: {
          backgroundColor: 'black',
          height: 2,
        },
        tabBarLabelStyle: {
          fontFamily: Typography.FONT_FAMILY_HEADING,
          fontSize: Typography.FONT_SIZE_16,
        },
        tabBarStyle: { position: 'absolute' },
      }}
    >
      <Tab.Screen name="UPPER BODY" component={HS_ExerciseScreen} />
      <Tab.Screen name="LOWER BODY" component={HS_ExerciseScreen} />
      <Tab.Screen name="ABS" component={HS_ExerciseScreen} />
      <Tab.Screen name="BACK" component={HS_ExerciseScreen} />
      <Tab.Screen name="COMPOUND" component={HS_ExerciseScreen} />
    </Tab.Navigator>
  );
};

// const styles = StyleSheet.create({});

export default HS_ExerciseView;
