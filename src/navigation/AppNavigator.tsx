import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  HomeScreen,
  DashboardScreen,
  ProfileScreen,
  ChatScreen,
} from '@screens/index';
import { AppStackParamList, AppDrawerParamList } from './types';
import { Colors } from '@constants/index';

const Stack = createNativeStackNavigator<AppStackParamList>();
const Drawer = createDrawerNavigator<AppDrawerParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const DashboardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const ChatStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export function AppNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Colors.primary,
        drawerInactiveTintColor: Colors.textSecondary,
        drawerStyle: {
          backgroundColor: Colors.white,
        },
      }}
    >
      <Drawer.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: 'Organisations',
        }}
      />
      <Drawer.Screen
        name="DashboardStack"
        component={DashboardStack}
        options={{
          title: 'Dashboard',
        }}
      />
      <Drawer.Screen
        name="ChatStack"
        component={ChatStack}
        options={{
          title: 'Chat',
        }}
      />
      <Drawer.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          title: 'Profile',
        }}
      />
    </Drawer.Navigator>
  );
}
