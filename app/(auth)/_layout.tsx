
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import LandingPage from '@/app/(auth)';
import LoginPage from '@/app/(auth)/login-page';
import RegisterPage from '@/app/(auth)/register-page';
import Role from '@/app/(auth)/role';


const Stack = createNativeStackNavigator();


export default function AuthLayout() {
  return (
      <Stack.Navigator initialRouteName="index">
        <Stack.Screen name="index" component={LandingPage} options={{ headerShown: false}} />
        <Stack.Screen name="login-page" component={LoginPage} options={{ headerShown: false}} />
        <Stack.Screen name="register-page" component={RegisterPage} options={{ headerShown: false}} />
        <Stack.Screen name="role" component={Role} options={{ headerShown: false}} />
      </Stack.Navigator>
  );
}