import React from 'react';

// LIB
import { useField } from '../../lib';

import style from './style.module.css';

export const Input = ({ name, type }) => {
  const inp = useField(name, { type });
  const { touched, error } = inp.getMeta();
  return (
    <div className={style['input-container']}>
      <input {...inp.getInputProps()} className={style.input} />
      {touched && error && <span className={style.error}>{error}</span>}
    </div>
  );
};
