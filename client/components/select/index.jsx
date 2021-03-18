import React from 'react';

// LIB
import { useField } from '../../lib';

import style from './style.module.css';

export const Select = ({ name, type }) => {
  const inp = useField(name, { type });
  const { touched, error } = inp.getMeta();
  return (
    <div className={style['input-container']} >
      <select {...inp.getInputProps()}>
        <option />
        <option value="ff0000">Red</option>
        <option value="00ff00">Green</option>
        <option value="0000ff">Blue</option>
      </select>
      {touched && error && <span className={style.error}>{error}</span>}
    </div>
  );
};
