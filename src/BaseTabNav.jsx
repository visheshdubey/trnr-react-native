import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NAV_HomeScreen from './screen/HomeScreen/NAV_HomeScreen';
import MyWorkout from './screen/WorkoutScreen';
import Profile from './screen/Profile';
import { Typography } from './styles';

import { Linking } from 'react-native';
import ShopScreen from './screen/ShopScreen';
import HomeIcon from './components/HomeIcon';
import WorkoutIcon from './components/WorkoutIcon';
import ShopIcon from './components/ShopIcon';
import ProfileIcon from './components/ProfileIcon';

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
        headerTitleAlign: 'center',
        headerTintColor: 'black',
        headerTitleStyle: {
          fontFamily: Typography.FONT_FAMILY_HEADING,
          fontSize: Typography.FONT_SIZE_24,
        },
        headerShadowVisible: false,
      }}
    >
      <Tab.Screen
        name="HOME"
        component={NAV_HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => <HomeIcon fill={color} size={18} />, //<Icon name="home" color={color} size={18} />,
        }}
      />
      <Tab.Screen
        name="MY WORKOUTS"
        component={MyWorkout}
        options={{
          tabBarIcon: ({ size, color }) => <WorkoutIcon fill={color} size={18} />,
        }}
      />
      <Tab.Screen
        name="SHOP"
        component={ShopScreen}
        options={{
          tabBarIcon: ({ size, color }) => <ShopIcon fill={color} size={18} />,
        }}
        listeners={{
          tabPress: (e) => {
            // Prevent default action
            Linking.openURL('https://trnr.com');
            e.preventDefault();
          },
        }}
      />
      <Tab.Screen
        name="PROFILE"
        component={Profile}
        options={{
          tabBarIcon: ({ size, color }) => <ProfileIcon fill={color} size={18} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BaseTabNav;
