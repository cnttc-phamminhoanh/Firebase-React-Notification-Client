import React, { Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { toast } from 'react-toastify';
import { messaging } from './firebaseInit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import { requestFirebaseNotificationPermission } from './firebaseInit';

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

  const getFirebaseToken = async() => {
    const requestFNP = await requestFirebaseNotificationPermission();
    setToken(requestFNP);
  }

  try {
    messaging.onMessage((payload) => {
      const { title, body } = payload.data;
      toast.success(`${title}; ${body}`);
    });
  } catch (error) {
    console.log(error)
  }

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
          Firebase notifictations with React and NestJs
        </Navbar.Brand>
      </Navbar>

      <Container className="center-column">
        <Row style = {divButton}>
          <Button variant="warning" style={{color: '#fff'}} onClick={() => getFirebaseToken()}>Get Firebase Token</Button>{' '}
        </Row>
          <Col style = {divToken}>
            { token }
          </Col>  
      </Container>
    </Fragment>
  );
};

export default App;