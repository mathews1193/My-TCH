/*Layout
<Logo>
Impatient care guide for: <patient name>
--View--
Your care Team
List<Medical Providers>
--EndView--
--View--
You care plan
List<care plan>
  Date, content
--EndView--
--View--
Do you have questions  for your team?
Don't hesitate to ask us questions. You can write them out or send a voice note. 
Buttton<Ask a question>
Your questions: List<question>
Answered questions: list<answered question>
--EndView--
*/
import React, {useState ,useEffect} from 'react';
import { SafeAreaView, FlatList, StatusBar, StyleSheet, TouchableOpacity, Image, Text, View, ScrollView } from "react-native";
import VoiceAssistScreen from './VoiceAssistScreen';
import {getQuestionsUri, sendGetRequest} from '../server_api';
import { Appbar } from 'react-native-paper';

import database from '@react-native-firebase/database';

export default function PatientHomeScreen({patient}) {
  console.log("my patient ", patient);
  const provider_data = [
    {
      id: 1,
      uri: "https://i.ibb.co/zRL5XHZ/African-american-doctor-man-Health-care-medical-background.jpg",
      name: 'Dr. Tony Stark',
      role: 'Attending',
      //add title
    },
    {
      id: 2,
      uri: 'https://i.ibb.co/RhgwW54/Smiling-female-doctor-with-a-folder-in-uniform-standing.jpg',
      name: 'Dr. Carole Danver',
      role: 'Fellow',
    },
    {
      id: 3,
      name: 'Bruce Banner',
      uri: 'https://i.ibb.co/T00McLj/Portrait-of-young-male-nurse.jpg',
      role: 'Nurse',
    },
    {
      id: 4,
      uri: 'https://i.ibb.co/M2SdQYT/Portrait-Of-Smiling-Female-Doctor-Wearing-White-Coat-With-Stethoscope-In-Hospital-Office.jpg',
      name: 'Elsa Frost',
      role: 'Respiratory Therapist',
    },
  ];
  const renderImage = ({item}) => {
    //TODO: style image with name
    return (
      <View>
        <Image
          style={styles.providerimage}
          source={{
            uri: item.uri,
          }} 
        />
        <Text style={{fontWeight: 'bold', textAlign: 'center', fontSize: 16}}>{item.name}</Text>
        <Text style={{textAlign: 'center', fontSize: 16}}>{item.role}</Text>
      </View>
    )
  }
  const [careplan_data ,addCarePlan] = useState([]);
  
  const renderCarePlan = ({item}) => {
    //TODO: style image with name
    return (
      <View style={styles.careplan}>
        <Text style={{fontWeight: 'bold'}}>Plan</Text>
        <Text>{item.content}</Text>
      </View>
    )
  };

  const [questions, addQuestions] = useState([]);

  const renderQuestion = ({item}) => {
    //TODO: style image with name
    if (item.answerId !== '')
      return ;
    return (
      <View style={styles.careplan}>
        <Text><Text style={{fontWeight: 'bold'}}>Q:</Text> {item.content}</Text>
      </View>
    );
  };

  const renderAnsweredQuestion = ({item}) => {
    //TODO: style image with name
    if (item.answerId === '')
      return ;
    return (
      <View style={styles.careplan}>
        <Text><Text style={{fontWeight: 'bold'}}>Q:</Text> {item.content}</Text>
      </View>
    );
  };

  const answered_questions = [
    {
      id: 1,
      text: "Should I get the vaccine?"
    },
    {
      id: 2,
      text: "Should I not wearing the mask after vaccination?"
    },
  ];
  const updateQuestion = (question: any) => {
    console.log("called updateQuestion");
    addQuestions([...questions, question]);
  }
  //get questions from database
  useEffect( () => {
    async function fetchQuestions() {
      const uri = getQuestionsUri(patient.id.toString());

      const responseJson = await  sendGetRequest(uri);
      console.log("questions ", responseJson);
      addQuestions(responseJson);
    }
    if (questions.length === 0)
      fetchQuestions();
  }, [])

  //get care plans from database
  useEffect( () => {
    const refPlan = database().ref('care_plans');
    const refDetail = refPlan.orderByChild('patientId').equalTo(patient.id.toString());
    const onPlanChange = refDetail.on("value", (snapshot) => {
      console.log("patient id" , patient.id);
      console.log("care plans from listener", snapshot.val());
      const result = snapshot.val();
      var plans = [];
      for (var i in result) {
            plans.push(result[i]);
      }
      console.log("care plans ", plans);
      addCarePlan(plans);
    })
    return () => refDetail.off('value', onPlanChange);
  }, [])

  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://texaschildrensannualreport.org/2017/assets/img/logo-intro-red.png',
        }}
      />
      <Text style={{fontWeight: 'bold', fontSize: 20, margin: 20, padding: 10}}>Inpatient care guide for:
        <Text style={{fontWeight: 'bold', fontSize: 20}}>  {patient.name}</Text> 
      </Text>
      <View style={styles.providers}>
        <Text style={styles.providertitle}>Your care team</Text>
        <FlatList
          horizontal
          data={provider_data}
          renderItem={renderImage}
          keyExtractor={(item) => item.id.toString()}
          style={styles.providerimages}
        />
      </View>
      <View style={styles.providers}>
        <Text style={styles.providertitle}>Your care plan</Text>
        <FlatList
          data={careplan_data}
          renderItem={renderCarePlan}
          keyExtractor={(item) => item.id.toString()}
          
        />
      </View>
      <VoiceAssistScreen style={styles.providers} userId={patient.id} updateQuestions={updateQuestion}
       addButtonTitle="Ask a question" sendButtonTitle="Send question" isPatient={true}/>
      <View style={styles.providers}>
      <Text style={styles.providertitle}>Your Questions</Text>
        <FlatList
          data={questions}
          renderItem={renderQuestion}
          keyExtractor={(item) => item.id.toString()}
          
        />
      </View>
      <View style={styles.providers}>
      <Text style={styles.providertitle}>Answered Questions</Text>
        <FlatList
          data={questions}
          renderItem={renderAnsweredQuestion}
          keyExtractor={(item) => item.id.toString()}
          
        />
      </View>
      </ScrollView>
     
    </SafeAreaView>
   
  )
} 

const styles = StyleSheet.create({
  careplan: {
    marginVertical: 10,
  },
  providers: {
    flex: 1,
    backgroundColor: "rgb(249,249,249)",
    borderRadius: 20,
    marginTop: 10,
    marginVertical: 20,
    paddingHorizontal: 30,
  },
  providerimage: {
    marginVertical: 20,
    marginHorizontal: 10,
    width: 100,
    height: 100,

  },
  providertitle: {
    color: "rgb(0,122,255)",
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "white",
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
  noti: {
    fontSize: 16,
    color: "red",
    textAlign: 'right',
    alignSelf: "flex-end",
  },
  logo: {
    alignSelf: 'flex-start',
    marginVertical: 20,
    marginHorizontal: 30,
    width: 130,
    height: 110,
    resizeMode: 'stretch',
  },
  separator: {
    marginVertical: 2,
    height: 1,
    width: '80%',
  },
  view: {
    flexDirection: "row",
  },
  top: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 40,
  },
});
