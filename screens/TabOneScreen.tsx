import * as React from 'react';
import { Button } from 'react-native';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View} from '../components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
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
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    marginTop:10,
    height: 90,
    width: '80%',
  },
  separator: {
    marginVertical: 2,
    height: 1,
    width: '80%',
  },
});
