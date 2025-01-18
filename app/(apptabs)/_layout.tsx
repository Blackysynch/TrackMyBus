import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';


import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) =><Feather name="map" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'map',
          tabBarIcon: ({ color }) => <Feather name="map" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'profile',
          tabBarIcon: ({ color }) => <Feather name="user" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'notifications',
          tabBarIcon: ({ color }) => <Feather name="bell" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="receipts"
        options={{
          title: 'receipts',
          tabBarIcon: ({ color }) => <Feather name="file-text" size={24} color="black" />,
        }}
      />

      {/* last icon should be a checkmark */}

      
      
      
    </Tabs>
  );
}
