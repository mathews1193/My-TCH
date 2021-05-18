import * as React from 'react';
import { Button, Image } from 'react-native';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View} from '../components/Themed';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>Welcome, Patient Name</Text>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/052012/texas-childrens.jpg?itok=tW6_xSJ6',
        }}
      />
      <View style={styles.button}>
        <Button
        title="Medical Team"
        type="outline"
        />
        </View>
        <View style={styles.button}>
        <Button
        title="Care Plan"
        type="outline"
        />
        </View>
        <View style={styles.button}>
        <Button
        title="Questions"
        type="outline"
        />
      </View>
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
