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

const defaultOptions = {
  type: 'text',
  value: '',
};

export default function useField(
  fieldName: string,
  options: FieldOptions,
) {
  if (!fieldName) {
    throw new Error(
      'useField: A field is required to use this hook. eg, useField(\'myField\', options)',
    );
  }

  const inputProps: React.MutableRefObject<InputProps> = useRef({
    id: id++,
    name: fieldName,
    options: { ...defaultOptions, ...options },
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

  const getCheckedProperty = useCallback((v: any) => {
    const { type, value } = inputProps.current.options;

    if (type === 'checkbox') return v;
    if (type === 'radio') return value === v;
    return undefined;
  }, []);

  const onChangeHandler = useCallback((onChange) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, type, checked } = e.target;

    const meta = {
      form: ctxRef.current ? ctxRef.current.formName : '',
      field: inputProps.current.name,
    };
    
    const inputValue = type === 'checkbox' ? checked : value;
    const payload = { value: inputValue };

    dispatch(changeField({ meta, payload }));
    if (typeof onChange === 'function') onChange(e);
  }, [dispatch]);

  const onBlurHandler = useCallback((onBlur) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const meta = {
      form: ctxRef.current ? ctxRef.current.formName : '',
      field: inputProps.current.name,
    };
    
    const payload = {};
    dispatch(onBlurField({ meta, payload }));
    if (onBlur) onBlur(e);
  }, [dispatch]);

  const getInputProps = useCallback(
    ({ onChange, onBlur, ...rest } = {}) => {
      const { type, value: initialValue } = inputProps.current.options;

      const v = form && form.values[inputProps.current.name];
      const value = getValue(v, type);
      return {
        value: initialValue || value,
        name: inputProps.current.name,
        type,
        checked: getCheckedProperty(value),
        onChange: onChangeHandler(onChange),
        onBlur: onBlurHandler(onBlur),
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
    const { value } = inputProps.current.options;
    return {
      value: value || getValue(form.values[inputProps.current.name]),
      error: form.errors[inputProps.current.name],
      touched: form.touched[inputProps.current.name],
    };
  }, [form]);

  return {
    getInputProps,
    getMeta,
  };
}
