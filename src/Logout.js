import React from 'react';

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    // Perform logout logic here
    // Call onLogout function to update the login status in the parent component
    onLogout();
  };


};

export default Logout;
