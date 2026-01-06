import React, {useState, useContext} from 'react';
import {TextInput, Button,View, StyleSheet} from 'react-native';
import Spacer from '../components/Spacer';
import { Context as TaskContext } from '../Context/TaskContext';

const TaskCreate = ({ navigation }) => {
    /*const { addTask } = useContext(TaskContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
    const onSave = async() => {
        await addTask({ title, description });
        navigation.goBack();
    };
    */
    return(
    /*<View style = { styles.container }>
        <TextInput label = "Title" value = {title} onChangeText = {setTitle}/>
         <TextInput label = "Description" value = {description} onChangeText = {setDescription}/>
         <Spacer>
         <Button title = "Save Task" onPress = {onSave}/>
        </Spacer>
    </View>
   */
  <View><Text>TaskCreate Screen</Text></View> );
};

const styles = StyleSheet.create({container:{ flex: 1,padding: 20 }});

export default TaskCreate;