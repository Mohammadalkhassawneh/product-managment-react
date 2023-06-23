import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const Login = ({ onLogin }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/login', {
        email,
        password
      });

      // Handle successful login, e.g., update authentication status and store tokens
      setSuccessMessage(response.data.message);
      setError('');
      onLogin(); // Call the onLogin function to update the login state
      navigate('/products');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        // Handle login error, e.g., display error message
        setError(error.response.data.message);
        setSuccessMessage('');
      }
    }
  };

  return (
    <div className="container col-4">
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label className="d-flex justify-content-start">Email</Form.Label>
          <div className="d-flex">
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label className="d-flex justify-content-start">Password</Form.Label>
          <div className="d-flex">
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </Form.Group>
        <div className="d-flex justify-content-start">
          <Button type="submit" variant="primary">
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
