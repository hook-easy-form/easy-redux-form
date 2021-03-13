import { Dispatch } from 'redux';
import { IState } from '../types/state.types';
import { DoSubmit } from '../types/useForm.types';

import { submitting, setValidation } from './actions';

export const doSubmit = ({ name, cb, validator }: DoSubmit) => (
  dispatch: Dispatch,
  getState: () => IState,
) => {
  const meta = { form: name, field: '', setTouchedForAllValues: true };

  const { values } = getState().form[name];

  dispatch(submitting({ meta, payload: { submitted: true } }));
  return new Promise((res, rej) => {
    const { valid } = getState().form[name];
    if (valid) res(null);
    else rej(null);
  })
    .then(() => {
      return cb(values);
    })
    .catch(() => {
      if (validator && typeof validator === 'function') {
        dispatch(setValidation({ meta, payload: validator(values) }));
      }
    })
    .finally(() =>
      dispatch(submitting({ meta, payload: { submitted: false } })),
    );
};
