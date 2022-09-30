import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HS_ExerciseScreen from './HS_ExerciseScreen';
import { Mixins, Typography } from '../../styles';
const Tab = createMaterialTopTabNavigator();

const NAV_ExerciseScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        // tabBarScrollEnabled: true,
        headerTitleStyle: {
          fontFamily: Typography.FONT_FAMILY_HEADING,
          fontSize: Typography.FONT_SIZE_24,
        },
        tabBarIndicatorStyle: {
          backgroundColor: 'black',
        },

        tabBarLabelStyle: {
          fontFamily: Typography.FONT_FAMILY_HEADING,
          fontSize: Typography.FONT_SIZE_16,
        },
      }}
    >
      <Tab.Screen name="UPPER BODY" component={HS_ExerciseScreen} />
      {/* <Tab.Screen name="LOWER BODY" component={HS_ExerciseScreen} /> */}
      {/* <Tab.Screen name="ABS" component={HS_ExerciseScreen} /> */}
      {/* <Tab.Screen name="BACK" component={HS_ExerciseScreen} />
      <Tab.Screen name="COMPOUND" component={HS_ExerciseScreen} /> */}
    </Tab.Navigator>
  );
};

// const styles = StyleSheet.create({});

export default NAV_ExerciseScreen;
