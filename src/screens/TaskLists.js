/*import React, { useContext, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { TaskContext } from '../Context/TaskContext';
import { MaterialIcons } from '@expo/vector-icons';   // ✅ import dustbin icon

const TaskLists = ({ navigation }) => {
  const { state, fetchTasks, deleteTask } = useContext(TaskContext); // ✅ pull deleteTask too

  useEffect(() => {
    const unsubscribe = fetchTasks();
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Task Lists</Text>

      <Button 
        title="Go to TaskDetail"
        onPress={() => navigation.navigate('TaskDetail')}
      />

      {state.tasks.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No tasks yet</Text>
      ) : null}

      <FlatList
        data={state.tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            <TouchableOpacity
              style={styles.taskTextWrapper}
              onPress={() => navigation.navigate('TaskDetail', { id: item.id })}
            >
              <Text style={styles.task}>{item.title}</Text>
            </TouchableOpacity>

            
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  taskTextWrapper: { flex: 1 },
  task: { fontSize: 16 },
});

export default TaskLists;
*/
// screens/TaskLists.js
/*import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TaskContext } from '../Context/TaskContext'; // adjust path if needed

const TaskLists = ({ navigation }) => {
  const { state, fetchTasks, deleteTask } = useContext(TaskContext);

  useEffect(() => {
    fetchTasks();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.taskCard}>
        
        <TouchableOpacity
          style={styles.taskInfo}
          onPress={() => navigation.navigate('TaskDetail', { id: item.id })}
        >
          <Text style={styles.taskTitle}>{item.title}</Text>
          {item.dueDate && (
            <Text style={styles.dueDate}>Due: {item.dueDate}</Text>
          )}
          <Text
            style={[
              styles.status,
              item.completed ? styles.completed : styles.pending,
            ]}
          >
            {item.completed ? 'Completed' : 'Pending'}
          </Text>
        </TouchableOpacity>

        
        <TouchableOpacity onPress={() => deleteTask(item.id)}>
          <MaterialIcons name="delete" size={26} color="#FF4C4C" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
    
      <View style={styles.header}>
        <Text style={styles.headerText}>My Tasks</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('NewTask')}
        >
          <MaterialIcons name="add" size={24} color="white" />
          <Text style={styles.addButtonText}>New Task</Text>
        </TouchableOpacity>
      </View>

     
      {state.tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tasks yet</Text>
        </View>
      ) : (
        <FlatList
          data={state.tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9FAFB', // soft light gray background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 8,
    elevation: 3, // shadow for header
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#2563EB',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    marginLeft: 6,
    fontWeight: '600',
    fontSize: 16,
  },
  taskCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 14,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  taskInfo: {
    flex: 1,
    marginRight: 12,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },
  dueDate: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  completed: {
    color: '#059669',
    backgroundColor: '#D1FAE5',
  },
  pending: {
    color: '#DC2626',
    backgroundColor: '#FECACA',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default TaskLists;*/

import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { TaskContext } from '../Context/TaskContext';

const TaskLists = ({ navigation }) => {
  const { state, fetchTasks, deleteTask } = useContext(TaskContext);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = state.tasks.filter(task => {
    if (filter === "Pending") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
            <TouchableOpacity onPress={() => navigation.navigate('TaskDetail', {id: item.id})}>
          {/* Checkbox + title */}
          <View style={styles.titleRow}>
            <MaterialIcons
              name={item.completed ? "check-box" : "check-box-outline-blank"}
              size={22}
              color={item.completed ? "#2563EB" : "#999"}
            />
            <Text style={[styles.taskTitle, item.completed && styles.taskCompleted]}>
              {item.title}
            </Text>
          </View>
</TouchableOpacity>
          {/* Delete icon */}
          <TouchableOpacity onPress={() => deleteTask(item.id)}>
            <MaterialIcons name="delete" size={22} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Description */}
        {item.description ? (
          <Text style={styles.description}>{item.description}</Text>
        ) : null}

        {/* Meta info */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
  <MaterialIcons name="event" size={16} color="#666" />
  <Text style={styles.metaText}>Due {formatDate(item.dueDate)}</Text>
</View>
<View style={styles.metaItem}>
  <MaterialIcons name="schedule" size={16} color="#666" />
  <Text style={styles.metaText}>Created {formatDate(item.createdAt)}</Text>
</View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>
              {item.completed ? "Completed" : "Pending"}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  // Helper function to format Firestore timestamp
const formatDate = (dateObj) => {
  if (!dateObj) return "N/A";
  try {
    // Firestore timestamp has toDate() method
    if (dateObj.toDate) {
      return dateObj.toDate().toDateString();
    }
    // If it's already a JS Date
    if (dateObj instanceof Date) {
      return dateObj.toDateString();
    }
    return String(dateObj); // fallback
  } catch {
    return "N/A";
  }
};

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Tasks</Text>
          <Text style={styles.headerSub}>{state.tasks.length} task</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.newTaskButton}
            onPress={() => navigation.navigate('NewTask')}
          >
            <MaterialIcons name="add" size={20} color="white" />
            <Text style={styles.newTaskText}>New Task</Text>
          </TouchableOpacity>
          <Ionicons name="person-circle-outline" size={28} color="black" style={{ marginLeft: 10 }} />
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        {["All", "Pending", "Completed"].map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f} ({f === "All" ? state.tasks.length : 
                  f === "Pending" ? state.tasks.filter(t => !t.completed).length : 
                  state.tasks.filter(t => t.completed).length})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      {filteredTasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tasks yet</Text>
        </View>
      ) : (
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSub: {
    fontSize: 14,
    color: 'gray',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newTaskButton: {
    flexDirection: 'row',
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  newTaskText: {
    color: 'white',
    marginLeft: 4,
    fontWeight: '600',
  },
  filters: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterBtn: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  filterBtnActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  filterText: {
    color: '#555',
    fontSize: 14,
  },
  filterTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '600',
    color: '#111',
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  description: {
    marginTop: 4,
    color: '#555',
    fontSize: 14,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  metaText: {
    marginLeft: 4,
    fontSize: 13,
    color: '#555',
  },
  statusBadge: {
    marginLeft: 'auto',
    backgroundColor: '#2563EB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default TaskLists;


