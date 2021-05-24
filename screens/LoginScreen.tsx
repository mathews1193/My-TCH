import React, {useState} from 'react';
import {SafeAreaView, TextInput,
   Button, Image, StyleSheet, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';

import { Text, View} from '../components/Themed';
import * as RootNavigation from '../RootNavigation';
import Navigation from '../navigation';
import useColorScheme from '../hooks/useColorScheme';
import DoctorHomeScreen from '../screens/DoctorHomeScreen';
import PatientHomeScreen from './PatientHomeScreen';
import PatientDoctorScreen from './PatientDoctorScreen';
import messaging from '@react-native-firebase/messaging';
import app from '@react-native-firebase/app';

export default function LoginScreen() {
  const [loginRole, setLoginRole] = useState("");
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const ROLE = {patient: "patient", doctor: "doctor"};
  const colorScheme = useColorScheme();

  //test data
  const patient = {id: 878000, room: "B231", name: "Luther"};
  const provider = {id: "d101", name: "Pamela"};

  const image = { uri: "https://images.pexels.com/photos/4067908/pexels-photo-4067908.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" };
  const image1 = { uri: "https://images.pexels.com/photos/2835436/pexels-photo-2835436.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" };

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled = 
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
      if (enabled) {
        console.log('Authorization status:', authStatus);
        const token = await messaging().getToken();
        console.log('my token: ', token);
      }
  }
  
  requestUserPermission();

  const loginHandler = () => {
    if (loginRole == ROLE.patient) {
      console.log("welcome patient");
      console.log("navigate to patient screen");
      setAuthenticated(true);
      //RootNavigation.navigate("Home", {});
    } else if (loginRole == ROLE.doctor) {
      console.log("welcome doctor");
      console.log("navigate to doctor screen");
      RootNavigation.navigate("Doctor", {});
      setAuthenticated(true);
    }
  }
  if (! authenticated) {
    if (loginRole === "") {
      return  (
        <View style={styles.containerlogin}>
          <ImageBackground source={image} style={styles.image}>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://waystogive.texaschildrens.org/assets/images/tch-logo-full-color.png',
            }}
          />
         
          <Text style={styles.title}>Welcome to TCH Mycare!</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <TouchableOpacity onPress={() => setLoginRole(ROLE.patient)} style={[styles.roleButton]}>
            <Text style={[styles.roleText]}>Patient</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLoginRole(ROLE.doctor)} style={[styles.roleButton]}>
            <Text style={[styles.roleText]}>Medical Provider</Text>
          </TouchableOpacity>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View style={styles.containerlogin}>
          <ImageBackground source={image1} style={styles.image}>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://waystogive.texaschildrens.org/assets/images/tch-logo-full-color.png',
            }}
          />
          <Text style={styles.title}> Welcome!</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={email}
            placeholder="email"
            textContentType="emailAddress"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            placeholder="password"
            textContentType="password"
            secureTextEntry= {true}
          />
          <TouchableOpacity onPress={() => loginHandler()} style={[styles.loginButton]}>
            <Text style={[styles.loginText]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLoginRole("")} style={[styles.loginButton]}>
            <Text style={[styles.loginText]}>Back</Text>
          </TouchableOpacity>
          </ImageBackground>
        </View>
      )
    }
  } else {
    if (loginRole === ROLE.patient) {
      
      return (<PatientHomeScreen patient={patient}/>)
    } else if (loginRole === ROLE.doctor) {
      return (<DoctorHomeScreen /> ) 
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "white",
  },
  containerlogin: {
    flex: 1,
    flexDirection: "column",

  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width:'100%',
    height:'100%',
  },
  roleButton: {
    alignItems: 'center',
    height: 40,
    marginVertical: 50,
    marginHorizontal: 40, 
    backgroundColor: "blue",
    borderRadius: 10, 
  },
  roleText: {
    paddingTop: 5,
    fontSize: 25,
    color: "white",
    textAlign : 'center',  
  }, 
  loginButton: {
    alignItems: 'center',
    height: 40,
    marginVertical: 20,
    marginHorizontal: 40, 
    backgroundColor: "blue",
    borderRadius: 10,
  },
  loginText: {
    fontSize: 30,
    color: "white",
    textAlign : 'center',  
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 40,
    marginBottom: 20,
    alignSelf: 'center',
  },
 
  input: {
    alignItems: 'flex-start',
    backgroundColor:"#e6e6e6",
    height: 40,
    marginVertical: 20,
    marginHorizontal: 40,
    borderWidth: 1,
  },
  logo: {
    marginTop: 5,
    width: 170,
    height: 120,
    resizeMode: 'stretch',
    alignSelf: 'center',
  },
  separator: {
    marginVertical: 2,
    marginHorizontal:30,
    height: 1,
    width: '80%',
  },
});
