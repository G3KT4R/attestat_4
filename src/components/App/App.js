import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';
import './App.css';
import { Header } from '../Header/Header';
import { AppRoute } from '../../consts';
import { MainPage } from '../../pages/MainPage/MainPage';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { RegistrationPage } from '../../pages/RegistrationPage/RegistrationPage';
import { AuthProvider } from '../../context/authContext';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <div className="App">
            <Header />
            <Routes>
              <Route
                path={AppRoute.Main}
                element={
                  <PrivateRoute>
                    <MainPage />
                  </PrivateRoute>
                }
              />
              <Route path={AppRoute.Login} element={<LoginPage />} />
              <Route path={AppRoute.Registration} element={<RegistrationPage />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
