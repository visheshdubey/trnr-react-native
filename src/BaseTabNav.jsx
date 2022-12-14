import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NAV_HomeScreen from './screen/HomeScreen/NAV_HomeScreen';
import { Mixins, Typography } from './styles';

import { Linking } from 'react-native';
import ShopScreen from './screen/ShopScreen';
import HomeIcon from './components/HomeIcon';
import WorkoutIcon from './components/WorkoutIcon';
import ShopIcon from './components/ShopIcon';
import ProfileIcon from './components/ProfileIcon';
import NAV_ProfileScreen from './screen/ProfileScreen/NAV_ProfileScreen';
import NAV_WorkoutScreen from './screen/WorkoutScreen/NAV_WorkoutScreen';

const Tab = createBottomTabNavigator();
export const BaseTabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontFamily: Typography.FONT_FAMILY_HEADING,
          fontSize: Typography.FONT_SIZE_15,
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
        component={NAV_WorkoutScreen}
        options={{
          headerShown: false,
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
        component={NAV_ProfileScreen}
        options={{
          tabBarIcon: ({ size, color }) => <ProfileIcon fill={color} size={18} />,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BaseTabNav;
