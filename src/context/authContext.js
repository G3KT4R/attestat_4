import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../consts';

const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(window.localStorage.getItem('user') || null);
  const navigate = useNavigate();

  const login = (token, user) => {
    window.localStorage.setItem('token', JSON.stringify(token));
    window.localStorage.setItem('user', JSON.stringify(user));
    setUser(JSON.stringify(user));
    navigate(AppRoute.Main);
  };

  const logout = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    setUser(null);
  };

  const isLoggedIn = user !== null;
  console.log('user', user);

  const authData = {
    user,
    login,
    logout,
    isLoggedIn,
  };

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};
