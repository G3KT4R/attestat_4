import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './registration_page.css';
import { ApiRoute, AppRoute } from '../../consts';
import { MyButton } from '../../stories/MyButton';

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const emailInputChangeHandler = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const passwordInputChangeHandler = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const registrationFormSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:9500${ApiRoute.Registration}`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const result = await response.json();
      console.log('result', result);
      if (result.success === true) {
        navigate(AppRoute.Login);
        setErrorMessage('');
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isSubmitBtnDisabled = email === '' || password === '';

  return (
    <div className="registration">
      <h3>Форма регистрации</h3>
      <div className="form-wrapper">
        <form>
          <div className="input-wrapper">
            <label>Email:</label>
            <input type="text" placeholder="Введите email" value={email} onChange={emailInputChangeHandler} />
          </div>
          <div className="input-wrapper">
            <label>Password:</label>
            <input type="password" placeholder="Введите пароль" value={password} onChange={passwordInputChangeHandler} />
          </div>
          <MyButton label={'Зарегистрироваться'} onClickFn={registrationFormSubmitHandler} disabled={isSubmitBtnDisabled} />
          {/* <button type="submit" onClick={registrationFormSubmitHandler} disabled={handleSubmitBtnDisable()}>
            Зарегистрироваться
          </button> */}
        </form>
      </div>
      <div className="registrate">
        Зарегистрированы? <Link to={AppRoute.Login}>Войти</Link>
      </div>
      <div className="error">{errorMessage && <div className="error-message">{errorMessage}</div>}</div>
    </div>
  );
};
