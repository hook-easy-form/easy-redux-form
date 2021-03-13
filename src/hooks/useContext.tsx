import React from 'react';
import { TFormContext } from '../types/useContext.types';

const FormContext = React.createContext<TFormContext>(null);

export function FormContextProvider({
  value,
  children,
}: {
  value: TFormContext;
  children: React.ReactNode;
}): JSX.Element {
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

export default function useFormContext(): TFormContext {
  const ctx = React.useContext(FormContext);

  if (!ctx) {
    throw new Error('You are trying to use the form API outside of a form!');
  }

  return ctx;
}
