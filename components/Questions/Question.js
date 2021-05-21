import React from 'react';
import firebase from '../Firebase'
import { List} from 'react-native-paper';
import { Alert } from "react-native";

function Question({doc}) {
      async function toggleComplete() {
        await firebase.database().ref('Questions/').child(doc.key).update ({complete: !doc.val().complete})
        console.log(doc.key)
      }

      function deleted(){
        Alert.alert(
          "Deleting Question",
          "Are you Sure you want to delete this?",
          [
            {
              text: "Yes",
              onPress: () => firebase.database().ref('Questions/').child(doc.key).remove(),
              style: "cancel"
            },
            { text: "Cancel", onPress: () => console.log("Cancel Pressed") }
          ]
        );
      }

  return ( 
          <List.Item
                title={doc.val().title}
                description={doc.val().description}
                onPress={() => toggleComplete() }
                onPress={() => deleted() }
                style={{
                  flex:1,
                }} 
                right={props => (
                  <List.Icon {...props} icon={doc.val().complete ? 'check' : 'cancel'} />
                    )}
          />
    
  );
}

export default React.memo(Question);