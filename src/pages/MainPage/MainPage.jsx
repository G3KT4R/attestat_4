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
      <div className="custom-table">
        <div className="headers"></div>
        <img src="C:\Users\germa\Desktop\intermediate_certification_4-dev\public\joker.jpg"></img>
        {characters &&
          characters.map((character) => <img src={character.image}></img>)}
      </div>
    </>
  );
};
