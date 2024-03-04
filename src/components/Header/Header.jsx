import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import { useAuthContext } from "../../context/authContext";
import { AppRoute } from "../../consts";

export const Header = () => {
  const cutQuotationMarks = (string) => string.slice(1, -1);
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
  };

  const goToLoginPageHandler = () => {
    navigate(AppRoute.Login);
  };

  return (
    <header className="header">
      <h1>Aboba</h1>
      {user ? (
        <div
          className="header-user"
          title="Выйти из аккаунта"
          onClick={logoutHandler}
        >
          <div className="user-name">Выйти из аккаунта</div>
        </div>
      ) : (
        <div
          className="header-user"
          title="На страницу авторизации"
          onClick={goToLoginPageHandler}
        ></div>
      )}
    </header>
  );
};
