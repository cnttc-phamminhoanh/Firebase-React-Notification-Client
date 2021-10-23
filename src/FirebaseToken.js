/* eslint-disable no-console */
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { divToken } from './style';
import { toast } from 'react-toastify';
import {
  messaging,
  requestFirebaseNotificationDeleteToken,
  requestFirebaseNotificationGetToken
} from './firebaseInit';

export const FirebaseToken = () => {
  const [ token, setToken ] = React.useState('');
  const [ showButtonDelete, setShowButtonDelete ] = React.useState(false);

  try {
    messaging.onMessage((payload) => {
      const { title, body } = payload.data;
      toast.success(<div>{ title }<br/> { body }</div>);
    });
  } catch (error) {
    console.log(error);
  }

  const getFirebaseToken = async() => {
    const requestFNP = await requestFirebaseNotificationGetToken();
    setToken(requestFNP);
    setShowButtonDelete(true);
  };

  const deleteFirebaseToken = async() => {
    await requestFirebaseNotificationDeleteToken();
    setToken('');
    setShowButtonDelete(false);
  };

  const buttonCurent = () => {
    return showButtonDelete ? <Button variant="danger" style={{ color: '#fff' }} onClick={() => deleteFirebaseToken()}>Delete Firebase Token</Button> : <Button variant="warning" style={{ color: '#fff' }} onClick={() => getFirebaseToken()}>Get Firebase Token</Button>;
  };

  return (
    <div>
      <Row>
        { buttonCurent() }
      </Row>
      <Col style = { divToken }>
        { token }
      </Col>
    </div>  
  );
};