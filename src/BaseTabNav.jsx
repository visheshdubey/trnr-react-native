import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screen/HomeScreen/NAV_HomeScreen';
import MyWorkout from './screen/MyWorkout';
import Profile from './screen/Profile';
import { Typography } from './styles';

import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();
export const BaseTabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontFamily: Typography.FONT_FAMILY_HEADING,
          fontSize: Typography.FONT_SIZE_14,
        },
        tabBarStyle: { position: 'absolute', backgroundColor: '#000' },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          animationEnabled: false,
          tabBarIcon: ({ size, color }) => <Icon name="home" color={color} size={18} />,
        }}
      />
      <Tab.Screen
        name="MyWorkouts"
        component={MyWorkout}
        options={{
          tabBarIcon: ({ size, color }) => <Icon name="dumbbell" color={color} size={18} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ tabBarIcon: ({ size, color }) => <Icon name="user" color={color} size={18} /> }}
      />
    </Tab.Navigator>
  );
};

export default BaseTabNav;
