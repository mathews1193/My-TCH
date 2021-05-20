import React from 'react';
import firebase from '../Firebase'
import { List} from 'react-native-paper';

function MedTeam({doc}) {
      async function toggleComplete() {
        await firebase.database().ref('Medical Staff/').child(doc.key).update ({complete: !doc.val().complete})
        console.log(doc.key)
      }

      function deleted(key){
        firebase.database().ref(`Medical Staff/${key}`).remove()
      }

  return (
    <View>
          <List.Item
          
                pic={doc.val().pic}
                name={doc.val().name}
                title={doc.val().title}
                onPress={() => toggleComplete() }
                style={{
                  flex:1,
                }} 
                left={props => (
                  <List.Icon {...props} icon={doc.val().complete ? 'check' : 'cancel'} />
                    )}
          />
    </View>
  );
}

export default React.memo(MedTeam);