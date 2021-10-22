/* eslint-disable no-console */
import React, { Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { toast } from 'react-toastify';
import { messaging, requestFirebaseNotificationDeleteToken, requestFirebaseNotificationGetToken } from './firebaseInit';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

const subscribeTokenTopicURL = 'http://localhost:3001/users/me/firebase/token/subscribe';
const unSubscribeTokenFromTopicURL = 'http://localhost:3001/users/me/firebase/token/subscribe';
const TokenUser = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIyZTBiNzZiZS1hNzM5LTRiMzctYTdhMS1jZmQ4Y2NkMmJiYzQiLCJmdWxsTmFtZSI6Im1hdGkiLCJzdGF0dXMiOiJBQ1RJVkUiLCJpYXQiOjE2MzQwMDUxODEsImV4cCI6MTY0MTc4MTE4MX0.7Wx3BsnRqhS-tcat-_RH-j9qni6VRhxV9rZN1mWiwq0';

const divToken = {
  margin: '40px',
  border: '1px solid #ffc107',
  width: '89%',
  wordBreak: 'break-all', 
  minHeight: '80px',
  borderRadius: '20px',
  color: '#28a745',
  padding: '20px'
};

const App = () => {
  const [ token, setToken ] = React.useState('');
  const [ showButtonDelete, setShowButtonDelete ] = React.useState(false);
  const [ valueInputToken, setvalueInputToken ] = React.useState('');

  try {
    messaging.onMessage((payload) => {
      const { title, body } = payload.data;
      toast.success(`${title}; ${body}`);
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

  const handleChange = (event) => {
    setvalueInputToken(event.target.value);
  };

  const handleSubmit = (event) => {
    axios.post(subscribeTokenTopicURL, { token: valueInputToken }, {
      headers: {
        'Authorization': `Bearer ${TokenUser}` 
      }
    }).then((res) => {
      console.log(res);
      toast.success('Subscribe succesfully');
    }).catch((err) => {
      console.log(err);
      toast.error('There was an error subscribing');
    });
    event.preventDefault();
  };

  const unSubscribeTokenFromTopic = () => {
    axios.delete(unSubscribeTokenFromTopicURL, {
      headers: { 
        'Authorization': `Bearer ${TokenUser}` 
      },
      data: {
        token: valueInputToken
      }
    }).then((res) => {
      console.log(res);
      setvalueInputToken('');
      toast.success('UnSubscribe succesfully');
    }).catch((err) => {
      console.log(err);
      toast.error('There was an error Unsubscribing');
    });
  };

  const buttonCurent = () => {
    return showButtonDelete ? <Button variant="danger" style={{ color: '#fff' }} onClick={() => deleteFirebaseToken()}>Delete Firebase Token</Button> : <Button variant="warning" style={{ color: '#fff' }} onClick={() => getFirebaseToken()}>Get Firebase Token</Button>;
  };

  return (
    <Fragment>
      <ToastContainer
        position="top-right"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar bg="warning" variant="dark">
        <Navbar.Brand href="#home">
          Firebase notifictations with React
        </Navbar.Brand>
      </Navbar>

      <Container className="center-column">
        <Row>
          { buttonCurent() }
        </Row>
        <Col style = { divToken }>
          { token }
        </Col>

        <Form onSubmit={(event) => handleSubmit(event)} style={{ marginTop: '100px' }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Subsciribe Token</Form.Label>
            <Form.Control type="text" placeholder="Enter token" value={ valueInputToken } onChange={(event) => handleChange(event)} />
            <Form.Text className="text-muted">
              Enter firebase token and subscribe
            </Form.Text>
          </Form.Group>
          <Button variant="success" type="submit">
            Subscribe Topic
          </Button>
          <span style={{ marginLeft: '5px' }}>
            <Button variant="danger" style={{ color: '#fff' }} onClick={(event) => unSubscribeTokenFromTopic(event)}>UnSubscribe Topic</Button>
          </span>
        </Form>
      </Container>
    </Fragment>
  );
};

export default App;