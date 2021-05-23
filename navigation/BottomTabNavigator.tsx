/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import { BottomTabParamList, HomeParamList, VoiceAssistParamList, MedTeamParamList } from '../types';
import VoiceAssistScreen from '../screens/VoiceAssistScreen';
import MedTeam from '../screens/MedTeamScreen';
import Home from '../screens/HomeScreen';
import DoctorHomeScreen from '../screens/DoctorHomeScreen';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="VoiceAssist"
        component={VoiceAssistNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="record-voice-over" size={24} color={color} />,
        }}
      />
       <BottomTab.Screen
        name="MedTeam"
        component={MedTeamNavigator}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="team" size={24} color= {color} />,
        }}
      />
      <BottomTab.Screen
        name="Doctor"
        component={DoctorNavigator}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="team" size={24} color= {color} />,
        }}
      />
    </BottomTab.Navigator>
    
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={Home}
        options={{ headerTitle: 'My TCH' }}
      />
    </HomeStack.Navigator>
  );
}

const VoiceAssistStack = createStackNavigator<VoiceAssistParamList>();

function VoiceAssistNavigator() {
  return (
    <VoiceAssistStack.Navigator>
      <VoiceAssistStack.Screen
        name="VoiceAssistScreen"
        component={VoiceAssistScreen}
        options={{ headerTitle: 'Voice Assistant' }}
      />
    </VoiceAssistStack.Navigator>
  );
}
const MedTeamStack = createStackNavigator<MedTeamParamList>();

function MedTeamNavigator() {
  return (
    <MedTeamStack.Navigator>
      <MedTeamStack.Screen
        name="MedTeamScreen"
        component={MedTeam}
        options={{ headerTitle: 'Medical Team' }}
      />
    </MedTeamStack.Navigator>
  );
}

const DoctorStack = createStackNavigator();

function DoctorNavigator() {
  return (
    <DoctorStack.Navigator>
      <DoctorStack.Screen
        name="DoctorHomeScreen"
        component={DoctorHomeScreen}
        options={{ headerTitle: 'Doctor' }}
      />
    </DoctorStack.Navigator>
  );
}
