/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { subscribeTokenTopicURL, unSubscribeTokenFromTopicURL, TokenUser } from './constant';
import { toast } from 'react-toastify';

export const SusbcribeTokenTopic = () => {
  const [ valueInputToken, setvalueInputToken ] = React.useState('');

  const handleChange = (event) => {
    setvalueInputToken(event.target.value);
  };

  const handleSubmit = (event) => {
    if (valueInputToken) {
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
    } else {
      alert('Token is empty');
    }
    event.preventDefault();
  };

  const unSubscribeTokenFromTopic = () => {
    if (valueInputToken) {
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
    } else {
      alert('Token is empty');
    }
  };

  return (
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
  );
};