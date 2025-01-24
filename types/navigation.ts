import { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
  Map: undefined;
  Notifications: undefined;
  Receipts: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  RoleSelection: undefined;
  StudentRegister: undefined;
  DriverRegister: undefined;
  MainApp: NavigatorScreenParams<MainTabParamList>;
  Login: undefined;
};
