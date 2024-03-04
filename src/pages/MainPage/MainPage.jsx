import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters, getCharacters } from "../../store/charactersSlice";
import "./main_page.css";

export const MainPage = () => {
  const dispatch = useDispatch();
  const characters = useSelector(getCharacters);

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  return (
    <>
      <h3>Главная страница</h3>
      <div className="image__wrapper">
        <img src={characters} alt="random Gif"></img>
      </div>
    </>
  );
};
