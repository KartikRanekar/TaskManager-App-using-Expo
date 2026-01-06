/*import React, {useState, useContext} from 'react';
import {Text, View, StyleSheet, TextInput, Button,Alert} from 'react-native';
import { TaskContext } from '../Context/TaskContext';
import { useNavigation } from '@react-navigation/native';
const NewTask = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(''); // optional field, for example

  const { addTask } = useContext(TaskContext);
  const navigation = useNavigation();

  const handleCreate = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Title is required.');
      return;
    }

    try {
      await addTask({ title, description, dueDate });
      Alert.alert('Success', 'Task created successfully.');
      navigation.navigate('TaskListTab'); // or goBack()
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to create task.');
    }
  };

    return(<View>
    <Text style={styles.label}>Title</Text>
      <TextInput
        placeholder="Enter task title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        placeholder="Enter task description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 100 }]}
        multiline
      />

    <Button title="Create Task" onPress={handleCreate} />

    </View>);
};

const styles = StyleSheet.create({});

export default NewTask;*/
// screens/TaskCreate.js
import React, { useState, useContext } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView 
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { TaskContext } from "../Context/TaskContext";

const NewTask = ({ navigation }) => {
  const { addTask } = useContext(TaskContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignee, setAssignee] = useState("");

  const handleCreateTask = () => {
    if (title.trim() === "") return;
    addTask({
      title,
      description,
      dueDate,
      assignee,
      status: "Pending",
      createdAt: new Date(),
    });
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Title <Text style={styles.required}>*</Text></Text>
      <TextInput
        placeholder="Enter task title..."
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        placeholder="Add a description..."
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Due Date</Text>
      <View style={styles.inputRow}>
        <MaterialIcons name="date-range" size={20} color="gray" />
        <TextInput
          placeholder="dd-mm-yyyy"
          style={styles.inputField}
          value={dueDate}
          onChangeText={setDueDate}
        />
      </View>

      <Text style={styles.label}>Assign To</Text>
      <View style={styles.inputRow}>
        <Ionicons name="person-outline" size={20} color="gray" />
        <TextInput
          placeholder="Enter assignee name..."
          style={styles.inputField}
          value={assignee}
          onChangeText={setAssignee}
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={[styles.button, styles.cancelButton]} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.createButton]} 
          onPress={handleCreateTask}
        >
          <Text style={styles.createText}>Create Task</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tipsBox}>
        <Text style={styles.tipsTitle}>Tips</Text>
        <Text style={styles.tip}>• Use clear, actionable titles for better organization</Text>
        <Text style={styles.tip}>• Set due dates to stay on track with deadlines</Text>
        <Text style={styles.tip}>• Add descriptions for complex tasks</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 16,
  },
  required: {
    color: "red",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    fontSize: 14,
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 8,
    backgroundColor: "#f9f9f9",
  },
  inputField: {
    flex: 1,
    padding: 10,
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cancelText: {
    color: "#333",
    fontWeight: "600",
  },
  createButton: {
    backgroundColor: "#2563eb",
  },
  createText: {
    color: "#fff",
    fontWeight: "600",
  },
  tipsBox: {
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 8,
    marginTop: 32,
  },
  tipsTitle: {
    fontWeight: "600",
    marginBottom: 8,
  },
  tip: {
    fontSize: 13,
    color: "#555",
    marginBottom: 4,
  },
});

export default NewTask;
