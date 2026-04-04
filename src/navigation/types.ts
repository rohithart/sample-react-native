import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  App: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Dashboard: undefined;
  Profile: undefined;
  Chat: undefined;
  OrganisationDetails: { id: string };
};

export type AppDrawerParamList = {
  HomeStack: undefined;
  DashboardStack: undefined;
  ProfileStack: undefined;
  ChatStack: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type AuthStackNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
export type AppStackNavigationProp = NativeStackNavigationProp<AppStackParamList>;
export type AppDrawerNavigationProp = DrawerNavigationProp<AppDrawerParamList>;
