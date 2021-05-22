import React, {useState} from 'react';
import {SafeAreaView, TextInput,
   Button, Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';

import { Text, View} from '../components/Themed';



export default function LoginScreen() {
  const [loginRole, setLoginRole] = useState("");
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  const ROLE = {patient: "patient", doctor: "doctor"};

  if (loginRole === "") {
    return  (
      <View style={styles.container}>
                <Image
          style={styles.logo}
          source={{
            uri: 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/052012/texas-childrens.jpg?itok=tW6_xSJ6',
          }}
        />
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text>Welcome to TechDoc</Text>

        <TouchableOpacity onPress={() => setLoginRole(ROLE.patient)} style={[]}>
          <Text>Login as Patient</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLoginRole(ROLE.doctor)} style={[]}>
          <Text>Login as Doctor</Text>
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
        />
        <TouchableOpacity onPress={() => setLoginRole(ROLE.patient)} style={[styles.loginButton]}>
          <Text style={[styles.loginText]}>Login</Text>
        </TouchableOpacity>
      </View>
    )
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
  containerlogin: {
    flex: 1,
    flexDirection: "column",

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
