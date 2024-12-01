import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { AuthContext } from './authContext.jsx'; // Import the context from the same folder

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  const login = async (inputs) => {
    await axios.post('http://localhost:8800/api/auth/login', inputs, {
      withCredentials: true,
    });
    setCurrentUser(JSON.parse(localStorage.getItem('user')));
  };

  const logout = async () => {
    await axios.post('http://localhost:8800/api/auth/logout', null, {
      withCredentials: true,
    });
    setCurrentUser(null);
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('user');
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
