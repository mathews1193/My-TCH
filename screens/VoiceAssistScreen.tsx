import React, { Component, Fragment } from 'react';
import { Button, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import VoiceDictation from '../components/VoiceDictation';
import * as Permissions from "expo-permissions";
import { white } from 'react-native-paper/lib/typescript/styles/colors';

import {getSendCarePlanUri, getSendQuestionUri, sendPostRequest} from '../server_api';

var ERROR_MSG : string = "Can't recognize your voice";

type Props = {
  userId: string,
  style: any,
  updateQuestions: any,
  addButtonTitle: string,
  sendButtonTitle: string,
  isPatient: boolean,
}

type State = {
  nonRecordText: string,
  question: string,
  askQuestionPressed: boolean,
}

class VoiceAssistScreen extends Component<Props, State> {
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
  //handler for child component
  updateQuestion = (recordedText: string) => {
    console.log("called updatequestion");
    var result: string = this.state.nonRecordText + " " + recordedText;
    this.setState({question: result});
  }
  endQuestion = () => {
    console.log("called end question");
    this.setState({nonRecordText: this.state.question});
  }

  handleTextChange = (text: string) => {
    this.setState({question: text, nonRecordText: text});
  }

  //TODO: refactor outside of this component
  sendQuestion = async () => {
    const uri = getSendQuestionUri(this.props.userId);
    console.log("Sending " + this.state.question + " to the medical team");
    const responseJson = await sendPostRequest(uri, {question: this.state.question});
    console.log("got response: ", responseJson);
    //state update
    this.props.updateQuestions(responseJson);
    this.setState({question: "", askQuestionPressed: false, nonRecordText: "",})
  }

  //TODO: refactor outside of this component

  sendCarePlan = async () => {
    const uri = getSendCarePlanUri(this.props.userId);
    console.log("Sending " + this.state.question + " to the careplan data");
    const responseJson = await sendPostRequest(uri, {care_plan: this.state.question, patientId: "878000"});
    console.log("got response: ", responseJson);
    //state update
    //update caerplan
    this.props.updateQuestions(responseJson);
    this.setState({question: "", askQuestionPressed: false, nonRecordText: "",})
  }

  cancelQuestion = () => {
    this.setState({question: "", askQuestionPressed: false, nonRecordText: "",})
  }

  render() {
    var askStyle = this.state.askQuestionPressed ? [styles.askButton, styles.disabledButton] : [styles.askButton];

    return (
      <View style={this.props.style}> 
        {this.props.isPatient && <Text style={styles.title}>Do you have questions for your team?</Text> }
        {this.props.isPatient && <Text>Don't hesitate to ask us questions. You can write them out or send a voice note.</Text> }
        <TouchableOpacity 
          style={askStyle} 
          onPress={() => this.setState({askQuestionPressed: true})} 
          disabled={this.state.askQuestionPressed}>
          <Text style={styles.askText}>{this.props.addButtonTitle}</Text>
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
            <VoiceDictation updateQuestion={this.updateQuestion} endQuestion={this.endQuestion}/>
          </Fragment>
        }
        {!this.state.askQuestionPressed &&
            null
        }
        {this.state.question !== "" &&
          <View>
            <TouchableOpacity style={styles.sendButton} onPress={this.props.isPatient ? this.sendQuestion : this.sendCarePlan}>
              <Text style={styles.askText}>{this.props.sendButtonTitle}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.askButton} onPress={this.cancelQuestion}>
            <Text style={styles.askText}>Cancel</Text>
          </TouchableOpacity>
          </View>
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
  disabledButton: {
    backgroundColor: "rgba(210,56,58, 0.5)",
    
  },
  sendButton: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgb(0,122,255)",
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
