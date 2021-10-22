import firebase from 'firebase/app';
import 'firebase/messaging';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyCK8GJBcHd-JElFPv6vWgMJGqCkir0XG4g',
  authDomain: 'testnotifications-be62d.firebaseapp.com',
  databaseURL: 'https://testnotifications-be62d-default-rtdb.firebaseio.com',
  projectId: 'testnotifications-be62d',
  storageBucket: 'testnotifications-be62d.appspot.com',
  messagingSenderId: '517153457467',
  appId: '1:517153457467:web:e47b772b91c443ee73e31e',
  measurementId: 'G-YGN0LJC1GG'
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const storage = firebase.storage();
export const database = firebase.database();
export const messaging = firebase.messaging();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
