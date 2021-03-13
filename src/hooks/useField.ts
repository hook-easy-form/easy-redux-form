import React, { useCallback, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useFormContext from './useContext';
import {
  initializeField,
  changeField,
  onBlurField,
  destroyField,
} from '../redux/actions';
import { TFormContext } from '../types/useContext.types';
import { IState } from '../types/state.types';
import { FieldOptions, InputProps } from '../types/useField.types';
import { getValue } from '../utils/getValue';

let id = 0;

export default function useField(
  fieldName: string,
  { type = 'text' }: FieldOptions = {},
) {
  if (!fieldName) {
    throw new Error(
      'useField: A field is required to use this hook. eg, useField(\'myField\', options)',
    );
  }

  const inputProps: React.MutableRefObject<InputProps> = useRef({
    id: id++,
    name: fieldName,
    options: { type },
  });

  const ctx = useFormContext();
  const dispatch = useDispatch();

  const ctxRef: React.MutableRefObject<TFormContext> = useRef(null);
  ctxRef.current = ctx;

  const form = useSelector((s: IState) => s.form[ctx ? ctx.formName : '']);

  useEffect(() => {
    const fieldName = inputProps.current.name;
    if (form) {
      if (!form.fields[fieldName]) {
        const meta = {
          form: ctxRef.current ? ctxRef.current.formName : '',
          field: inputProps.current.name,
        };
        dispatch(
          initializeField({ meta, payload: inputProps.current.options }),
        );
      }
    }
  }, [form, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(
        destroyField({
          meta: {
            form: ctxRef.current ? ctxRef.current.formName : '',
            field: inputProps.current.name,
          },
          payload: {},
        }),
      );
    };
  }, [dispatch]);

  const getInputProps = useCallback(
    ({ onChange, onBlur, ...rest } = {}) => {
      const meta = {
        form: ctxRef.current ? ctxRef.current.formName : '',
        field: inputProps.current.name,
        error: '',
      };
      const v = form && form.values[inputProps.current.name];
      const type = inputProps.current.options.type;
      const value = getValue(v, type);
      return {
        value,
        name: inputProps.current.name,
        type,
        checked: type === 'checkbox' ? value : undefined,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          const { value, type, checked } = e.target;
          const inputValue = type === 'checkbox' ? checked : value;
          const payload = { value: inputValue };
          dispatch(changeField({ meta, payload }));
          if (onChange) onChange(e);
        },
        onBlur: (e: React.ChangeEvent<HTMLInputElement>) => {
          const payload = {};
          dispatch(onBlurField({ meta, payload }));
          if (onBlur) onBlur(e);
        },
        ...rest,
      };
    },
    [dispatch, form],
  );

  const getMeta = useCallback(() => {
    if (!form)
      return {
        value: undefined,
        error: undefined,
        touched: undefined,
      };

    return {
      value: getValue(form.values[inputProps.current.name]),
      error: form.errors[inputProps.current.name],
      touched: form.touched[inputProps.current.name],
    };
  }, [form]);

  return {
    getInputProps,
    getMeta,
  };
}
