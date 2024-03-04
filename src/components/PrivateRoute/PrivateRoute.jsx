import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import { AppRoute } from '../../consts';

export const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthContext();
  console.log('isLoggedIn', isLoggedIn);

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate(AppRoute.Login);
      return;
    }
  }, [isLoggedIn, navigate]);

  return children;
};
