import React, { Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { toast } from 'react-toastify';
import { messaging, requestFirebaseNotificationDeleteToken, requestFirebaseNotificationGetToken } from './firebaseInit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

const divToken = {
  margin: '40px',
  border: '1px solid #ffc107',
  width: '85%',
  wordBreak: 'break-all', 
  minHeight: '80px',
  borderRadius: '20px',
  color: '#28a745',
  padding: '20px'
};

const divButton = {
  marginTop: '80px',
};

const App = () => {
  const [ token, setToken ] = React.useState('');
  const [ showButtonDelete, setShowButtonDelete ] = React.useState(false);

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

  try {
    messaging.onMessage((payload) => {
      const { title, body } = payload.data;
      toast.success(`${title}; ${body}`);
    });
  } catch (error) {
    console.log(error);
  }

  const buttonCurent = () => {
    if(showButtonDelete) {
      return (
        <Button variant="danger" style={{ color: '#fff' }} onClick={() => deleteFirebaseToken()}>Delete Firebase Token</Button>
      );
    } else {
      return (
        <Button variant="warning" style={{ color: '#fff' }} onClick={() => getFirebaseToken()}>Get Firebase Token</Button>
      );
    } 
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
        <Row style = {divButton}>
          { buttonCurent() }
        </Row>
        <Col style = {divToken}>
          { token }
        </Col>  
      </Container>
    </Fragment>
  );
};

export default App;