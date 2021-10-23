/* eslint-disable no-console */
import React, { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import { SusbcribeTokenTopic } from './SubscribeTokenTopic.js';
import { FirebaseToken } from './FirebaseToken';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const App = () => {

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
        <FirebaseToken />
        <SusbcribeTokenTopic />
      </Container>
    </Fragment>
  );
};

export default App;