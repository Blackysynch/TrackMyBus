import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ReceiptUploadScreen from './receipt-upload';
import HomeScreen from './home';
import ExploreScreen from './explore';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="explore" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ReceiptUpload"
        component={ReceiptUploadScreen}
        options={{
          tabBarLabel: 'Upload Receipt',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="receipt" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
z