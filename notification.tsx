import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

// Function to request notification permissions
const requestNotificationPermission = async (): Promise<boolean> => {
  const authStatus = await messaging().requestPermission();
  const isEnabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (isEnabled) {
    console.log('Notification permissions granted.');
  } else {
    console.log('Notification permissions denied.');
  }

  return isEnabled;
};

// Function to handle notifications
const handleNotifications = () => {
  // Foreground notification handling
  messaging().onMessage(async (remoteMessage) => {
    Alert.alert(
      'Bus Notification',
      remoteMessage.notification?.body || 'Bus is arriving soon!'
    );
  });

  // Background and quit-state notification handling
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage);
  });

  // Notification when the user taps on it
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log('Notification caused app to open:', remoteMessage.notification);
    Alert.alert(
      'Bus Notification',
      remoteMessage.notification?.body || 'Bus is arriving soon!'
    );
  });

  // Handle the notification when the app is launched from a quit state
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          'App launched from notification:',
          remoteMessage.notification
        );
      }
    });
};

const NotificationSystem: React.FC = () => {
  useEffect(() => {
    const initializeNotifications = async () => {
      const hasPermission = await requestNotificationPermission();

      if (hasPermission) {
        // Get the device's Firebase token (for backend use)
        const token = await messaging().getToken();
        console.log('Firebase token:', token);

        // Set up notification handlers
        handleNotifications();
      }
    };

    initializeNotifications();
  }, []);

  return null; // This component doesn't render anything visually
};

export default NotificationSystem;
