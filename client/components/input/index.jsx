import React from 'react';

// LIB
import { useField } from '../../lib';

import style from './style.module.css';

export const Input = ({ name, type, value, onChange }) => {
  const inp = useField(name, { type, value });
  const { touched, error } = inp.getMeta();
  return (
    <div className={style['input-container']}>
      <input {...inp.getInputProps({ onChange })} className={type === 'checkbox' || type === 'radio' ? style.checkbox : style.input} />
      {touched && error && <span className={style.error}>{error}</span>}
    </div>
  );
};
