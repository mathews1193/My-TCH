import React, { Component } from 'react';
import { Button, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import VoiceDictation from '../components/VoiceDictation';


var ERROR_MSG : string = "Can't recognize your voice";

type State = {
  question: string;
  hasQuestion: boolean;
}

class VoiceAssistScreen extends Component<State> {
  state = {
    question: "Waiting for question...",
    hasQuestion: false
  }

  updateQuestion = (question: string) => {
    this.setState({question: question, hasQuestion: question != ERROR_MSG});
  }
  sendQuestion = () => {
    console.log("Sending " + this.state.question + " to the medical team");
    this.setState({question: "Your question is sent to the medical team", hasQuestion: false})
  }

  render() {
    return (
      <View style={styles.container}> 
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text>Do you have a question for your team?</Text> 
        <Text>Do you need information on your care plan?</Text>
        <Text>Record your question below for your team.</Text>
        <Text style={styles.title}>Voice Assistant</Text>
        <View style={styles.button}>
        <VoiceDictation updateQuestion={this.updateQuestion}/>
        </View>
        <Text>{this.state.question}</Text>
        {this.state.hasQuestion && <Button title="Send Question" onPress={this.sendQuestion} />}
      </View>
    );
  }
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
    marginTop: 30,
  },
  button: {
    marginTop:40,
    height: 90,
    width: '80%',
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: '80%',
  },
});

export default VoiceAssistScreen;
