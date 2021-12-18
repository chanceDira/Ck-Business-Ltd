import firebase from './Fire';
import 'firebase/database';

export  const database =  firebase.database().ref().child("product");
export const storage = firebase.storage();
export  const databaseOrder =  firebase.database().ref().child("order");
export const databaseTrainer = firebase.database().ref().child("trainer");
export const databasecertificate = firebase.database().ref().child("certificate");
export const databaseContact = firebase.database().ref().child("message");
export const databaseUser = firebase.database().ref().child("user");
export const auth = firebase.auth()