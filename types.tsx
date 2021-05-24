/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined; 
  CarePlan:undefined;
  Questions:undefined;
  PatientHome:undefined;
  DoctorHome:undefined;
  Login:undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  VoiceAssist: undefined;
  MedTeam: undefined;
  
};

export type HomeParamList = {
  HomeScreen: undefined;
};

export type VoiceAssistParamList = {
  VoiceAssistScreen: undefined;
};

export type MedTeamParamList = {
  MedTeamScreen: undefined;
};