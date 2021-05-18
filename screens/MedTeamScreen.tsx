import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Text, View } from '../components/Themed';

export default function MedTeamScreen() {
  return (
    <View style={styles.container}>
       <Image
        style={styles.logo}
        source={{
          uri: 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/052012/texas-childrens.jpg?itok=tW6_xSJ6',
        }}
      />
      <Text style={styles.title}>Impatient Care Guide for: </Text>
      <Text> Patient Name</Text>
      <Text> We will take care of you!</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Image
        style={styles.team}
        source={{
          uri: 'http://adamlowecreative.com/wp-content/uploads/2017/02/professional-doctor-headshot-400x600.jpg',
        }}
      />
      <Text>Dr. James</Text>
      <Text>Critical Care</Text>
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
  },
  logo: {
    marginBottom: 30,
    width: 100,
    height: 100,
    resizeMode: 'stretch',
  },
  team: {
    marginBottom: 30,
    width: 90,
    height: 140,
    resizeMode: 'stretch',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
});
