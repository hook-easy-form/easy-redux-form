import React from 'react';

// LIB
import { useField } from '../../lib';

export const Input = ({ name, type }) => {
  const inp = useField(name, { type });
  const { touched, error } = inp.getMeta();
  return (
    <div>
      <input {...inp.getInputProps()} />
      {touched && error && <span>{error}</span>}
    </div>
  );
};
