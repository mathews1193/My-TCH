import firebase from 'firebase';
// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCw5C8s8lJG_LXgyCy1ZP4lJVOVJk5TCn0",
    authDomain: "tech-doc-3fd16.firebaseapp.com",
    databaseURL: "https://tech-doc-3fd16-default-rtdb.firebaseio.com",
    projectId: "tech-doc-3fd16",
    storageBucket: "tech-doc-3fd16.appspot.com",
    messagingSenderId: "367059057929",
    appId: "1:367059057929:web:9a223abb483b9d6fa827d8",
    measurementId: "G-CFECKR945J"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  export default firebase;