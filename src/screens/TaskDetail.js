import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TaskContext } from "../Context/TaskContext";

const TaskDetail = ({ route, navigation }) => {
  const { id } = route.params;
  const { state, editTask, deleteTask } = useContext(TaskContext);

  // Find task by ID
  const task = state.tasks.find((t) => t.id === id);

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Task not found</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteTask(task.id);
          navigation.goBack();
        },
      },
    ]);
  };

  const toggleStatus = () => {
    const newStatus = task.status === "Completed" ? "Pending" : "Completed";
    editTask({ id: task.id, updates: { status: newStatus } });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            task.status === "Completed" && styles.titleCompleted,
          ]}
        >
          {task.title}
        </Text>
        <View
          style={[
            styles.statusBadge,
            task.status === "Completed"
              ? styles.statusCompleted
              : styles.statusPending,
          ]}
        >
          <Text style={styles.statusText}>{task.status}</Text>
        </View>
      </View>

      {/* Description */}
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>{task.description || "No description"}</Text>

      {/* Details box */}
      <View style={styles.detailsBox}>
        <View style={styles.detailRow}>
          <MaterialIcons name="event" size={20} color="#555" />
          <Text style={styles.detailText}>
            Due date:{" "}
            {task.dueDate
              ? new Date(task.dueDate).toDateString()
              : "No due date"}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="access-time" size={20} color="#555" />
          <Text style={styles.detailText}>
            Created:{" "}
            {task.createdAt?.seconds
              ? new Date(task.createdAt.seconds * 1000).toLocaleString()
              : "Unknown"}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="person" size={20} color="#555" />
          <Text style={styles.detailText}>
            Assigned to: {task.workAssigned || "Unassigned"}
          </Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={toggleStatus}>
          <Text style={styles.actionText}>
            {task.status === "Completed" ? "Pending" : "Completed"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("NewTask", { task })}
        >
          <Text style={styles.actionText}>Edit Task</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteText}>Delete Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
  },
  titleCompleted: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusCompleted: {
    backgroundColor: "#4CAF50",
  },
  statusPending: {
    backgroundColor: "#FFC107",
  },
  statusText: {
    color: "white",
    fontWeight: "600",
  },
  sectionTitle: {
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 4,
  },
  description: {
    fontSize: 15,
    color: "#333",
    marginBottom: 16,
  },
  detailsBox: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#555",
  },
  actions: {
    marginTop: 20,
  },
  actionButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 10,
  },
  actionText: {
    textAlign: "center",
    fontSize: 15,
    color: "#333",
  },
  deleteButton: {
    padding: 12,
    backgroundColor: "#ffebee",
    borderRadius: 6,
  },
  deleteText: {
    textAlign: "center",
    fontSize: 15,
    color: "red",
    fontWeight: "600",
  },
});

export default TaskDetail;
