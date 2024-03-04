import React from 'react';
import s from './my-button.module.css';

export const MyButton = ({ primary, label, onClickFn, disabled }) => {
  const mode = primary ? s['button-primary'] : s['button-secondary'];

  return (
    <button className={`${s.btn} ${mode}`} type="submit" onClick={onClickFn} disabled={disabled}>
      {label}
    </button>
  );
};
