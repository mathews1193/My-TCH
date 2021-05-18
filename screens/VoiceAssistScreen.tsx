import * as React from 'react';
import { Button, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

export default function VoiceAssistScreen() {
  return (
    <View style={styles.container}> 
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>Voice Assistant</Text>
      <View style={styles.button}>
      <Button
      title="Start"
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
  },
  button: {
    marginTop:10,
    height: 90,
    width: '80%',
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: '80%',
  },
});
