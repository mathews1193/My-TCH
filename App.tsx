import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import messaging from '@react-native-firebase/messaging';

import LoginScreen from './screens/LoginScreen';

import * as RootNavigation from './RootNavigation';

//Testing
import PatientHomeScreen from './screens/PatientHomeScreen';
import PatientDoctorScreen from './screens/PatientDoctorScreen';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect( () => {
    //handle notification
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      //TODO: go to patient detail based on ID
      const messageJson = remoteMessage.notification;
      console.log(messageJson);
      
      const title = messageJson?.title
      const question = messageJson?.body
      Alert.alert(title, question);
      

      RootNavigation.navigate('Doctor', {});
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      //TODO: go to doctor detail based on ID
      console.log("Notification caused app to open from background state: ", remoteMessage.notification);
    })
    messaging().getInitialNotification().then(remoteMessage => {
      //TODO: go to doctor detail based on ID
      if (remoteMessage) {
        console.log('Notification caused app to open from quit state: ', remoteMessage.notification);
      }
    })
  })
  if (!isLoadingComplete) {
    return null;
  } else {
    //test data
    const patient = {id: 878000, room: "B231", name: "Luther"} 
    return (
      <SafeAreaProvider>
        {/* <PatientHomeScreen patient = {patient}/> */}
        <PatientDoctorScreen patient={patient} />
        {/* <LoginScreen /> */}
        {/* <Navigation colorScheme={colorScheme}/>
         <StatusBar /> */}
      </SafeAreaProvider>
    );
  }
}
