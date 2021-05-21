import React ,{ useState, useEffect }from 'react';
import { Appbar, TextInput, Button } from 'react-native-paper';
import firebase from '../Firebase';
import { FlatList, } from 'react-native-gesture-handler';
import Question from './Question';
import { View } from 'react-native';

function Questions() {
    const [ question, setQuestion ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ todos, setTodos ] = useState([]);
    const [ userId, setUserId ] = useState([]);
    const db = firebase.database().ref('Questions/')

    async function addQuestion(){
        await db.push({
            userId,
            question,
            description,
            complete: false,
        });
        setQuestion('')
        setDescription('')
    }
        
    useEffect(() => {
        return db.on('value',(snapshot) => {
          const list = [];

          snapshot.forEach(doc => {
            console.log("doc", doc.val())
            list.push({
             doc,
            });
            console.log("list", list)
          });
    
          setTodos(list);
    
         
        });
    }, [] );
       

    return(
        <View style={{flex:1, width:'100%'}} >
        <FlatList 
            style={{flex:1, width:'100%'}}
            data={todos}
            keyExtractor={(item) => item.key} renderItem={({item}) =><Question {...item}  /> }
            
        />

        <TextInput label={'Question'} value={question} onChangeText={setQuestion} />
        <TextInput label={'What Medical Staff member?'} value={description} onChangeText={setDescription} />
        <Button onPress={() => addQuestion()}> Add Question </Button>
        
        </View>
    )
}
  

export default Questions;