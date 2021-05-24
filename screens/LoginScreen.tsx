import React, {useState} from 'react';
import {SafeAreaView, TextInput,
   Button, Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';

import { Text, View} from '../components/Themed';
import * as RootNavigation from '../RootNavigation';
import Navigation from '../navigation';
import useColorScheme from '../hooks/useColorScheme';
import DoctorHomeScreen from '../screens/DoctorHomeScreen';
import PatientHomeScreen from '../screens/PatientHomeScreen';

export default function LoginScreen() {
  const [loginRole, setLoginRole] = useState("");
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const ROLE = {patient: "patient", doctor: "doctor"};
  const colorScheme = useColorScheme();
 
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
          <Image
            style={styles.logo}
            source={{
              uri: 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/052012/texas-childrens.jpg?itok=tW6_xSJ6',
            }}
          />
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <Text style={styles.title}>Welcome to TechDoc</Text>

          <TouchableOpacity onPress={() => setLoginRole(ROLE.patient)} style={[styles.roleButton]}>
            <Text style={[styles.roleText]}>Patient</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLoginRole(ROLE.doctor)} style={[styles.roleButton]}>
            <Text style={[styles.roleText]}>Medical Provider</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.containerlogin}>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/052012/texas-childrens.jpg?itok=tW6_xSJ6',
            }}
          />
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <Text style={styles.title}>Login</Text>
          
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
        </View>
      )
    }
  } else {
    if (loginRole === ROLE.patient) {
      //test data
      const patient = {id: 878000, room: "B231", name: "Luther"};
      return (<PatientHomeScreen patient={patient}/>)
    } else if (loginRole === ROLE.doctor) {
      return (<DoctorHomeScreen navigation={{}} />) 
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
  roleButton: {
    alignItems: 'center',
    height: 40,
    marginVertical: 20,
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
    height: 40,
    marginVertical: 20,
    marginHorizontal: 40,
    borderWidth: 1,
  },
  logo: {
    marginTop: 40,
    width: 100,
    height: 100,
    resizeMode: 'stretch',
    alignSelf: 'center',
  },
  separator: {
    marginVertical: 2,
    height: 1,
    width: '80%',
  },
});
