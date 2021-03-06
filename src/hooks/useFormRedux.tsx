/* eslint-disable @typescript-eslint/no-empty-function */
import { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useDidUpdateEffect } from '../hooks/useDidUpdateEffect';
import { initializeForm, resetForm, setValidation, submit, updateInitialValues } from '../redux/actions';
import { FormOptions, FormProps } from '../types/useForm.types';
import { IState, TValues } from '../types/state.types';
import { useCreateFormComponent } from './useCreateFormComponent';
import { doSubmit } from '../redux/async.action';

const defaultOptions = {
  validate: undefined,
  initialValues: undefined,
  onSubmit: () => {},
  resetAfterSubmit: false,
};

export default function useForm(
  formName: string,
  options: FormOptions,
) {
  const formData: React.MutableRefObject<FormProps> = useRef({
    formName,
    options: { ...defaultOptions, ...options },
  });

  const dispatch = useDispatch();
  const form = useSelector((s: IState) => s.form[formData.current.formName]);
  const values = useSelector((s: IState) =>
    s.form[formData.current.formName]
      ? s.form[formData.current.formName].values
      : {},
  );
  const canBeValidated = useSelector((s: IState) => 
    s.form[formData.current.formName]
      ? s.form[formData.current.formName].canBeValidated
      : {},
  );

  useDidUpdateEffect(() => {
    if (options.initialValues) {
      const meta = { form: formData.current.formName };
      const payload = { initialValues: options.initialValues };
      dispatch(updateInitialValues({ meta, payload }));
      formData.current.options.initialValues = options.initialValues;
    }
  }, [options.initialValues, dispatch]);

  useEffect(() => {
    if (!form) {
      const meta = { form: formData.current.formName };
      const payload = { initialValues: formData.current.options.initialValues };
      dispatch(initializeForm({ meta, payload }));
    }
  }, [form, dispatch]);

  useEffect(() => {
    if (canBeValidated && Object.keys(values).length !== 0) {
      doValidate(values);
    }
  }, [values, canBeValidated, dispatch]);

  const doValidate = useCallback(
    (v: TValues) => {
      const validator = formData.current.options.validate;
      if (validator && typeof validator === 'function') {
        const meta = { form: formData.current.formName };
        dispatch(setValidation({ meta, payload: validator(v) }));
      }
    },
    [dispatch],
  );

  const reset = useCallback(
    () => {
      const meta = { form: formData.current.formName };
      dispatch(resetForm({ meta, payload: {} }));
    },
    [dispatch],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (event.persist) event.persist();
    if (event.preventDefault) event.preventDefault();

    await dispatch(submit(doSubmit(formData.current)));
  };

  const Form = useCreateFormComponent({
    handleSubmit,
    formName: formData.current.formName,
  });

  return {
    Form,
    reset,
    ...form,
  };
}
