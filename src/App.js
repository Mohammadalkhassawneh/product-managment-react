import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ProductList from './ProductList';
import RegistrationForm from './RegistrationForm';
import Login from './Login';
import Logout from './Logout';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleLogin = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
    // Perform any other necessary login logic
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    // Perform any other necessary logout logic
  };

  const ProtectedRoute = ({ element, path }) => {
    if (isLoggedIn) {
      return element;
    } else {
      return <Navigate to="/login" />;
    }
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <div className="navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link to="/products" className="nav-link btn btn-primary">Dashboard</Link>
                </li>
              </ul>
              <ul className="navbar-nav">
                {isLoggedIn ? (
                  <li className="nav-item">
                    <p>{`Welcome, ${userName}`}</p>
                    <Link to="/logout" className="nav-link btn btn-outline-primary" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link to="/login" className="nav-link btn btn-outline-primary">
                      Login
                    </Link>
                  </li>
                )}
                {!isLoggedIn && (
                  <li className="nav-item">
                    <Link to="/register" className="nav-link btn btn-outline-primary">
                      Register
                    </Link>
                  </li>
                )}
              </ul>

            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/products" element={<ProtectedRoute element={<ProductList />} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
