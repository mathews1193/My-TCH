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
import React, {useState} from 'react';
import { SafeAreaView, FlatList, StatusBar, StyleSheet, TouchableOpacity, Image, Text, View, ScrollView } from "react-native";

export default function PatientHomeScreen({patient}) {
  const provider_data = [
    {
      id: 1,
      uri: 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/052012/texas-childrens.jpg?itok=tW6_xSJ6',
      name: 'Pamela',
    },
    {
      id: 2,
      uri: 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/052012/texas-childrens.jpg?itok=tW6_xSJ6',
      name: 'Parag',
    },
    {
      id: 3,
      uri: 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/052012/texas-childrens.jpg?itok=tW6_xSJ6',
      name: 'Javier',
    },
    {
      id: 4,
      uri: 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/052012/texas-childrens.jpg?itok=tW6_xSJ6',
      name: 'Xarox',
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
        <Text>{item.name}</Text>
      </View>
    )
  }
  const careplan_data = [
    {
      id: 1,
      date: "May 22, 2021 12:00pm",
      plan: "Provide oxygen",
    },
    {
      id: 2,
      date: "May 22, 2021 6:00pm",
      plan: "Provide oxygen",
    },
    {
      id: 3,
      date: "May 24, 2021 8:00am",
      plan: "Provide oxygen",
    },
    {
      id: 4,
      date: "May 22, 2021 12:00pm",
      plan: "Provide oxygen",
    },
    {
      id: 5,
      date: "May 22, 2021 6:00pm",
      plan: "Provide oxygen",
    },
    {
      id: 6,
      date: "May 24, 2021 8:00am",
      plan: "Provide oxygen",
    },
  ];
  const renderCarePlan = ({item}) => {
    //TODO: style image with name
    return (
      <View style={styles.careplan}>
        <Text>{item.date}</Text>
        <Text>{item.plan}</Text>
      </View>
    )
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://texaschildrensannualreport.org/2017/assets/img/logo-intro-red.png',
        }}
      />
      <Text>Impatient care guide for: {patient.name}</Text>
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
  }
});
