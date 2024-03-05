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
  const [users, setUsers] = useState([]);
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

  const getUsers = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:9500${ApiRoute.Users}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const result = await response.json();
      console.log("result825", result);
      if (result.success === true) {
        setUsers(result.users);
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
      <button onClick={getUsers}>Получить пользователя</button>
      <div className={`${Styles.custom_table}`}>
        <div className={`${Styles.headers}`}>
          <div>
            {users.map((user) => {
              return (
                <div className={Styles.table__wrapper}>
                  <div className={Styles.first_column}>Email: {user.email}</div>
                  <div className={Styles.second_column}>
                    Status: {user.status}
                  </div>
                  <div className={Styles.third_column}>Date: {user.date}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
