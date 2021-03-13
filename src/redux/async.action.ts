import { Dispatch } from 'redux';
import { IState } from '../types/state.types';
import { OnSubmit } from '../types/useForm.types';

import { submitting } from './actions';

type DoSubmit = { name: string; cb: OnSubmit };

export const doSubmit = ({ name, cb }: DoSubmit) => (
  dispatch: Dispatch,
  getState: () => IState,
) => {
  const meta = { form: name, field: '' };
  dispatch(submitting({ meta, payload: { submitted: true } }));
  return new Promise((res, rej) => {
    const { valid } = getState().form[name];
    if (valid) res(null);
    else rej(null);
  })
    .then(() => {
      const { values } = getState().form[name];
      return cb(values);
    })
    .catch(() => null) // TODO trigger validate
    .finally(() =>
      dispatch(submitting({ meta, payload: { submitted: false } })),
    );
};
