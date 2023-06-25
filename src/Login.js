import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin, navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', true);
    onLogin();
    navigate('/products');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3000/api/v1/login', {
        email,
        password
      });
  
      setSuccessMessage(response.data.message);
      setError('');
      handleLogin(response.data.name, navigate);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
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
