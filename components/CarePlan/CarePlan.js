import React from 'react';
import firebase from '../Firebase'
import { Alert } from "react-native";
import { List} from 'react-native-paper';

function CarePlan({doc}) {
      async function toggleComplete() {
        await firebase.database().ref('Care Plan/').child(doc.key).update ({complete: !doc.val().complete})
        console.log(doc.key)
      }

      function deleted(){
        Alert.alert(
          "Deleting Care Plan",
          "Are you Sure you want to delete this?",
          [
            {
              text: "Yes",
              onPress: () => firebase.database().ref('Care Plan/').child(doc.key).remove(),
              style: "cancel"
            },
            { text: "Cancel", onPress: () => console.log("Cancel Pressed") }
          ]
        );
      }
      return(
          <List.Item
                title={doc.val().day}
                description={doc.val().description}
                onPress={() => toggleComplete() }
                onPress={() => deleted() }
                style={{
                  flex:1,
                }} 
                left={props => (
                  <List.Icon {...props} icon={doc.val().complete ? 'check' : 'cancel'} />
                    )}
          />
    
  );
}

export default React.memo(CarePlan);