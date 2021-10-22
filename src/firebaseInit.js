/* eslint-disable no-console */
import firebase from 'firebase/app';
import 'firebase/messaging';

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

export const messaging = firebase.messaging();

export const requestFirebaseNotificationGetToken = async () => {
  try {
    const getToken = await messaging.getToken();
  
    return getToken;
  } catch (error) {
    console.log(error);
  }
};

export const requestFirebaseNotificationDeleteToken = async () => {
  try {
    const getToken = await messaging.deleteToken();
  
    return getToken;
  } catch (error) {
    console.log(error);
  }
};
