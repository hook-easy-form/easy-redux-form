import { Dispatch, AnyAction } from 'redux';
import { IState } from '../types/state.types';
import { FormProps } from '../types/useForm.types';

import { submitting, setValidation, resetForm } from './actions';

export type DispatchAsync = (dispatch: Dispatch<AnyAction>, getState: () => IState) => Promise<any>;
export type AsyncAction = (data: FormProps) => (dispatch: Dispatch, getState: () => IState) => Promise<any>

export const doSubmit: AsyncAction = ({ formName, options }) => (dispatch, getState) => {
  const { validate, onSubmit, resetAfterSubmit } = options;
  const meta = { form: formName, field: '', setTouchedForAllValues: true };

  const { values } = getState().form[formName];

  dispatch(submitting({ meta, payload: { submitted: true } }));
  return new Promise((res, rej) => {
    const { valid } = getState().form[formName];
    if (valid) res(null);
    else rej(null);
  })
    .then(() => {
      onSubmit(values);
      if (resetAfterSubmit) dispatch(resetForm({ meta, payload: {} }));
    })
    .catch(() => {
      if (validate && typeof validate === 'function') {
        dispatch(setValidation({ meta, payload: validate(values) }));
      }
    })
    .finally(() => {
      dispatch(submitting({ meta, payload: { submitted: false } }));
    });
};
