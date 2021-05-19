import * as React from 'react';
import { Button, Image } from 'react-native';
import { StyleSheet } from 'react-native';

import { Text, View} from '../components/Themed';

export default function QuestionsScreen(  ) {
  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>Welcome, Patient Name</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginTop:5,
    height: 90,
    width: '80%',
  },
  logo: {
    marginBottom: 30,
    width: 100,
    height: 100,
    resizeMode: 'stretch',
  },
  separator: {
    marginVertical: 2,
    height: 1,
    width: '80%',
  },
});
