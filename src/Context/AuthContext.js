import React from 'react';
import createDataContext from './createDataContext';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import {auth} from '../backend/firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch(action.type){
        case 'sign_in':
            return { errorMessage: '', user : action.payload};
        case 'catch_error':
            return {...state, errorMessage : action.payload};
        case 'clear_error_message':
            return{...state, errorMessage:''};
        case 'sign_out':
            return{errorMessage: '', user: null};
        default:
            return state;
    }
}
const tryLocalSignIn = dispatch => async()=>{
    onAuthStateChanged(auth, user => {
        if(user){
            dispatch({type: 'sign_in', payload: user});
            navigate("Main");
            console.log("User Found");
        }
        else{
            console.log('User not found');
            navigate("Login");
        }
    })
};
const signup = dispatch => async({email, password}) =>{
    try{
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        dispatch({type: 'sign_in', payload: cred.user});
        navigate("Main");
    }
    catch(err){
        dispatch({type: 'catch_error', payload : err.message || 'Something Went wrong while sign up !.'});
    }
};

const signin = dispatch => async({email, password}) =>{
    try{
        const cred = await signInWithEmailAndPassword(auth, email, password);
        dispatch({type: 'sign_in', payload: cred.user});
        navigate("Main");
    }catch(err){
        dispatch({type: 'catch_error', payload: err.message || "Somerhing went wrong while sign in !."});
    }
};

const SignOutAction = dispatch => async() => {
    try{
        await signOut(auth);
        dispatch({type: 'sign_out'})
    }
    catch(err){
        console.log('signout error', err);
    }
};

const clearErrorMessage = dispatch => ()=>{
    dispatch({type: 'clear_error_message'});
};

export const {Provider, Context } = createDataContext(
    authReducer,
    {signin,signup, clearErrorMessage, SignOut: SignOutAction, clearErrorMessage, tryLocalSignIn},
    {user : null, errorMessage: ''}
);