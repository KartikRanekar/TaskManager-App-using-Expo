/*import React, {useState, useContext} from 'react' ;
import createDataContext from './createDataContext';
import { db, auth } from '../backend/firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'set_tasks':
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
};

const fetchTasks = dispatch => () => {
  const user = auth.currentUser;
  if (!user) {
    dispatch({ type: 'set_tasks', payload: [] });
    return;
  }
  const tasksCollection = collection(db, 'users', user.uid, 'tasks');
  const q = query(tasksCollection, orderBy('createdAt', 'desc'));
  const unsubscribe = onSnapshot(q, snapshot => {
    const tasks = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    dispatch({ type: 'set_tasks', payload: tasks });
  }, err => {
    console.log('tasks snapshot error', err);
  });

  return unsubscribe; // caller can use unsubscribe if needed
};

const addTask = dispatch => async ({ title, description, dueDate }) => {
  const user = auth.currentUser;
  if (!user) throw new Error('No user');
  const tasksCollection = collection(db, 'users', user.uid, 'tasks');
  await addDoc(tasksCollection, {
    title,
    description: description || '',
    done: false,
    dueDate: dueDate || null,
    createdAt: new Date()
  });
};

const editTask = dispatch => async ({ id, updates }) => {
  const user = auth.currentUser;
  if (!user) throw new Error('No user');
  const taskDoc = doc(db, 'users', user.uid, 'tasks', id);
  await updateDoc(taskDoc, updates);
};

const deleteTask = dispatch => async (id) => {
  const user = auth.currentUser;
  if (!user) throw new Error('No user');
  const taskDoc = doc(db, 'users', user.uid, 'tasks', id);
  await deleteDoc(taskDoc);
};

export const { Provider: TaskProvider, Context: TaskContext } = createDataContext(
  taskReducer,
  { fetchTasks, addTask, editTask, deleteTask },
  { tasks: [] }
);*/
import React, { useState, useContext } from "react";
import createDataContext from "./createDataContext";
import { db, auth } from "../backend/firebase";
import { 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";

// Reducer
const taskReducer = (state, action) => {
  switch (action.type) {
    case "set_tasks":
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
};

// Fetch tasks (real-time listener)
const fetchTasks = (dispatch) => () => {
  const user = auth.currentUser;
  if (!user) {
    dispatch({ type: "set_tasks", payload: [] });
    return;
  }

  const tasksCollection = collection(db, "users", user.uid, "tasks");
  const q = query(tasksCollection, orderBy("createdAt", "desc"));

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const tasks = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      dispatch({ type: "set_tasks", payload: tasks });
    },
    (err) => {
      console.log("tasks snapshot error", err);
    }
  );

  return unsubscribe; // can stop listening if needed
};

// Add task
const addTask = (dispatch) => async ({ title, description, dueDate, workAssigned , status}) => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user");

  const tasksCollection = collection(db, "users", user.uid, "tasks");

  await addDoc(tasksCollection, {
    title,
    description: description || "",
    dueDate: dueDate || null,       // store as string "dd-mm-yyyy" or Firestore Timestamp
    workAssigned: workAssigned || "", // person assigned
    status: status || "Pending",              // default status
    done: false,                    // kept for backward compatibility
    createdAt: serverTimestamp(),   // Firestore timestamp
  });
};

// Edit task
const editTask = (dispatch) => async ({ id, updates }) => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user");

  const taskDoc = doc(db, "users", user.uid, "tasks", id);
  await updateDoc(taskDoc, updates);
};

// Delete task
const deleteTask = (dispatch) => async (id) => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user");

  const taskDoc = doc(db, "users", user.uid, "tasks", id);
  await deleteDoc(taskDoc);
};

export const { Provider: TaskProvider, Context: TaskContext } = createDataContext(
  taskReducer,
  { fetchTasks, addTask, editTask, deleteTask },
  { tasks: [] }
);
