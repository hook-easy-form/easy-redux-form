import React, { useRef, MutableRefObject } from 'react';

import { FormContextProvider } from './useContext';
import { CreateFormProps } from '../types/useCreateForm.types';

export const useCreateFormComponent = (ctx: CreateFormProps) => {
  const formRef: MutableRefObject<React.FC | null> = useRef(null);
  const fromCtx: MutableRefObject<CreateFormProps> = useRef(ctx);

  if (!formRef.current) {
    const Form: React.FC = ({ children, ...rest }) => {
      const { formName, handleSubmit } = fromCtx.current;

      return (
        <FormContextProvider value={{ formName }}>
          <form onSubmit={handleSubmit} {...rest}>
            {children}
          </form>
        </FormContextProvider>
      );
    };
    formRef.current = Form;
  }

  return formRef.current;
};
