import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import axios from 'axios';

const RegistrationForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/signup', {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation
      });

      // Handle success, e.g., show a success message or redirect the user
      setResponseMessage(response.data.message); // Update the response message in the state
      navigate('/login'); // Redirect the user to the login page
    } catch (error) {
      // Handle error, e.g., display error messages
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <div className="container mt-3 col-4">
      <h2>Registration Form</h2>
      {errors.length > 0 && (
        <Alert variant="danger">
          <p>Errors:</p>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}
      {responseMessage && (
        <Alert variant="success">
          <p>Response Message:</p>
          <p>{responseMessage}</p>
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label  className='d-flex justify-content-start'>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label className='d-flex justify-content-start'>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="passwordConfirmation">
          <Form.Label className='d-flex justify-content-start'>Confirm Password</Form.Label>
          <Form.Control type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
        </Form.Group>
        <Button type="submit" variant="primary mt-3" className='d-flex justify-content-start'>Register</Button>
      </Form>
    </div>
  );
};

export default RegistrationForm;
