import React from 'react';
import firebase from '../Firebase'
import { List} from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler'

function Question({doc}) {
      async function toggleComplete() {
        await firebase.database().ref('todos/').child(doc.key).update ({complete: !doc.val().complete})
        console.log(doc.key)
      }

      function deleted(key){
        firebase.database().ref(`todos/${key}`).remove()
      }

  return (
          <List.Item
                title={doc.val().title}
                description={doc.val().description}
                onPress={() => toggleComplete() }
                style={{
                  flex:1,
                }} 
                left={props => (
                  <List.Icon {...props} icon={doc.val().complete ? 'check' : 'cancel'} />
                    )}
          />
    
  );
}

export default React.memo(Question);