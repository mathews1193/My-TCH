import React, { Component, Fragment } from 'react';
import { Button, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import VoiceDictation from '../components/VoiceDictation';
import * as Permissions from "expo-permissions";
import { white } from 'react-native-paper/lib/typescript/styles/colors';

var ERROR_MSG : string = "Can't recognize your voice";

type State = {
  question: string;
  hasQuestion: boolean;
  style: any;
}

class VoiceAssistScreen extends Component<State> {
  state = {
    nonRecordText: "",
    question: "",
    askQuestionPressed: false,
  }

  
  async componentDidMount() {
    //Ask speaker permission for Android
    const { status, expires, permissions } = await Permissions.askAsync(
      Permissions.AUDIO_RECORDING
    );
    if (status !== "granted") {
      //Permissions not granted. Don't show the start recording button because it will cause problems if it's pressed.
      //this.setState({showRecordButton: false});
      console.log("speaker is not granted");
    } else {
      console.log("speaker is granted")
      //this.setState({showRecordButton: true});
    }
  }

  componentWillUnmount () {
    console.log("Voice assistscreen will unmount");
  }
  updateQuestion = (recordedText: string) => {
    console.log("called updatequestion");
    var result: string = this.state.nonRecordText + " " + recordedText;
    this.setState({question: result});
  }
  handleTextChange = (text: string) => {
    this.setState({question: text, nonRecordText: text});
  }

  sendQuestion = async () => {
    let userId = 1;
    const SERVER_HOST = "http://localhost:3003";
    const API = `${SERVER_HOST}/patient/${userId}/question`;
    console.log("Sending " + this.state.question + " to the medical team");
    const response = await fetch(API, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: this.state.question,
      }),
    });
    const responseJson = await response.json();
    console.log("got response: ", responseJson);
    this.setState({question: "", askQuestionPressed: false, nonRecordText: "",})
  }

  render() {
    return (
      <View style={this.props.style}> 
        <Text style={styles.title}>Do you have questions for your team?</Text> 
        <Text>Don't hesitate to ask us questions. You can write them out or send a voice note.</Text>
        <TouchableOpacity style={styles.askButton} onPress={() => this.setState({askQuestionPressed: true})}>
          <Text style={styles.askText}>Ask a question</Text>
        </TouchableOpacity>
        {this.state.askQuestionPressed &&
            <Fragment>
              <TextInput 
              multiline
              numberOfLines={4}
              style={styles.askInput} 
              onChangeText={(text) => this.handleTextChange(text)}
              placeholder="Type or record your question"
              value={this.state.question}
            />
            <VoiceDictation updateQuestion={this.updateQuestion}/>
          </Fragment>
        }
        {!this.state.askQuestionPressed &&
            null
        }
        {this.state.question !== "" &&
          <TouchableOpacity style={styles.askButton} onPress={this.sendQuestion}>
            <Text style={styles.askText}>Send Question</Text>
          </TouchableOpacity>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 30,
  },
  askButton: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgb(210,56,58)",
    color: "white",
  },
  askText: {
    color: "white",
    fontSize: 20,
    textAlign: 'center',
  },
  askInput: {
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: "rgb(210,56,58)",
    height: 40,
  },
  button: {
    marginTop:40,
    height: 90,
    width: '80%',
  },
});

export default VoiceAssistScreen;
