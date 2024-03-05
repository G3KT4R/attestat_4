import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters, getCharacters } from "../../store/charactersSlice";
import { useNavigate } from "react-router-dom";
import { ApiRoute, AppRoute } from "../../consts";
import Styles from "./dataPage.module.css";

export const DataPage = () => {
  const dispatch = useDispatch();
  const characters = useSelector(getCharacters);

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const answer = "YES";
  const delteAll = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:9500${ApiRoute.Data}`, {
        method: "POST",
        body: JSON.stringify({ answer }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const result = await response.json();
      console.log("result", result);
      if (result.success === true) {
        navigate(AppRoute.Data);
        setErrorMessage("");
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h3>Журнал пользователей</h3>
      <button onClick={delteAll}>Cброс данных</button>
      <div className={`${Styles.custom_table}`}>
        <div className={`${Styles.headers}`}>
          <div className={`${Styles.first_column}`}>Email</div>
          <div className={`${Styles.second_column}`}>Password</div>
        </div>
      </div>
    </>
  );
};
