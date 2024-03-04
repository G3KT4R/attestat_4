import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters, getCharacters } from '../../store/charactersSlice';
import './main_page.css';

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
        <div className="headers">
          <div className="first-column">Имя персонажа</div>
          <div className="second-column">Пол персонажа</div>
        </div>
        {characters &&
          characters.map((character) => (
            <div key={character.id} className="tbody">
              <div className="first-column">{character.name}</div>
              <div className="second-column">{character.gender}</div>
            </div>
          ))}
      </div>
    </>
  );
};
