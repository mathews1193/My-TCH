/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'one',
            },
          },
          VoiceAssistScreen: {
            screens: {
              VoiceAssistScreen: 'two',
            },
          },
          MedTeam: {
            screens: {
              MedTeamScreen: 'three',
            },
          },
          CarePlan: {
            screens: {
              CarePlanScreen: 'four',
            },
          },
          Questions: {
            screens: {
              QuestionsScreen: 'five',
            },
          },
          PatientHome: {
            screens: {
              PatientDoctorScreen: 'six',
            },
          },
          DoctorHome: {
            screens: {
              PatientHomeScreen: 'seven',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
