import React ,{ useState, useEffect }from 'react';
import { Appbar, TextInput, Button } from 'react-native-paper';
import firebase from '../Firebase';
import { FlatList, } from 'react-native-gesture-handler';
import MedTeams from './medTeam';
import { View } from 'react-native';

function medTeams () {
    const [ careGiverID, setCareGiverID ] = useState('');
    const [ pic, setPic ] = useState('');
    const [ name, setName ] = useState('');
    const [ title, setTitle ] = useState([]);
    const db = firebase.database().ref('Medical Staff/')

    async function addTodo(){
        await db.push({
            id: careGiverID,
            name: name,
            pic:pic,
            title:title,
            complete: false,
        });
        setCareGiverID('')
        setPic('')
        setName('')
        setTitle('')

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
    
          setName(list);
    
         
        });
    }, [] );
       

    return(
        <View style={{flex:1, width:'100%'}} >
        <FlatList 
            style={{flex:1, width:'100%'}}
            data={medTeams}
            keyExtractor={(item) => item.key} renderItem={({item}) =><MedTeams {...item}  /> }
            
        />
        <TextInput label={'Photo URL'} value={pic} onChangeText={setPic} />
        <TextInput label={'Name'} value={name} onChangeText={setName} />
        <TextInput label={'Title'} value={title} onChangeText={setTitle} />
        <Button onPress={() => addTodo()}> Add Staff </Button>
        
        </View>
    )
}
  

export default medTeams;