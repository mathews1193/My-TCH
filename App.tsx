import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import messaging from '@react-native-firebase/messaging';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect( () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const messageJson = remoteMessage.notification;
      Alert.alert('A new FCM message arrived!', JSON.stringify(messageJson));
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log("Notification caused app to open from background state: ", remoteMessage.notification);
    })
    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification caused app to open from quit state: ', remoteMessage.notification);
      }
    })
  })
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
