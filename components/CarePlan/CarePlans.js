import React ,{ useState, useEffect }from 'react';
import { Appbar, TextInput, Button } from 'react-native-paper';
import firebase from '../Firebase';
import { FlatList, } from 'react-native-gesture-handler';
import CarePlan from './CarePlan';
import { View } from 'react-native';

function CarePlans () {
    const [ patientid, setPatientid ] = useState('');
    const [ day, setDay ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ todos, setTodos ] = useState([]);
    const db = firebase.database().ref('Care Plan/')

    async function addPlan(){
        await db.push({
            patientid,
            day,
            description,
            complete: false,
        });
        setDay('')
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
    
          setPatientid(list);
    
         
        });
    }, [] );
       

    return(
        <View style={{flex:1, width:'100%'}} >
        <FlatList 
            style={{flex:1, width:'100%'}}
            data={patientid}
            keyExtractor={(item) => item.key} renderItem={({item}) =><CarePlan {...item}  /> }
            
        />

        <TextInput label={'Description of plan'} value={description} onChangeText={setDescription} />
        <TextInput label={'What day is it?'} value={day} onChangeText={setDay} />
        <Button onPress={() => addPlan()}> Add New Care Plan </Button>
        
        </View>
    )
}

export default CarePlans;