import { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { initializeForm, setValidation } from '../redux/actions';
import { FormOptions, FormProps } from '../types/useForm.types';
import { IState, TValues } from '../types/state.types';
import { useCreateFormComponent } from './useCreateFormComponent';
import { useDidUpdateEffect } from './useDidUpdateEffect';
import { doSubmit } from '../redux/async.action';

export default function useForm(
  formName: string,
  { validate, initialValues, onSubmit }: FormOptions
) {
  const formData: React.MutableRefObject<FormProps> = useRef({
    formName,
    options: { validate, initialValues, onSubmit },
  });

  const dispatch = useDispatch();
  const form = useSelector((s: IState) => s.form[formData.current.formName]);
  const values = useSelector((s: IState) =>
    s.form[formData.current.formName]
      ? s.form[formData.current.formName].values
      : {}
  );

  useEffect(() => {
    if (!form) {
      const meta = { form: formData.current.formName, field: 'string;' };
      const payload = { initialValues };
      dispatch(initializeForm({ meta, payload }));
    }
  }, [form, dispatch]);

  useDidUpdateEffect(() => {
    if (Object.keys(values).length !== 0) {
      doValidate(values);
    }
  }, [values, dispatch]);

  const doValidate = useCallback(
    (v: TValues) => {
      const validator = formData.current.options.validate;
      if (validator && typeof validator === 'function') {
        const meta = { form: formData.current.formName, field: '' };
        dispatch(setValidation({ meta, payload: validator(v) }));
      }
    },
    [dispatch]
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (event.persist) event.persist();
    if (event.preventDefault) event.preventDefault();

    await dispatch(
      doSubmit({
        name: formData.current.formName,
        cb: formData.current.options.onSubmit,
      })
    );
  };

  const Form = useCreateFormComponent({
    handleSubmit,
    formName: formData.current.formName,
  });

  return {
    Form,
    ...form,
  };
}
