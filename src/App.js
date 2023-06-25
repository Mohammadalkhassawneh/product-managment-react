import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ProductList from './ProductList';
import RegistrationForm from './RegistrationForm';
import Login from './Login';
import Logout from './Logout';
import ProductCard from './ProductCard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const checkLoggedInStatus = () => {
      const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
      const storedUserName = localStorage.getItem('userName');

      if (storedIsLoggedIn && storedUserName) {
        setIsLoggedIn(true);
        setUserName(storedUserName);
      }
    };

    checkLoggedInStatus();
  }, []);

  const handleLogin = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('userName', name);
  
    const navigate = useNavigate();
    navigate('/products');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');

  };

  const ProtectedRoute = ({ element, path }) => {
    const navigate = useNavigate();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
      const checkAuthentication = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        setIsCheckingAuth(false);

        if (!isLoggedIn) {
          navigate('/login');
        }
      };

      checkAuthentication();
    }, [path, navigate]);

    if (isCheckingAuth) {
      return <div>Loading...</div>;
    }

    return element;
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
