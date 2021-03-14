import configureStore from 'redux-mock-store';

import { middleware } from './middleware';
import { doSubmit } from './async.action';
import { RESET_FORM, SET_VALIDATION, SUBMITTING } from './action.types';
import { submit } from './actions';

const mockStore = configureStore([middleware]);

describe('async actions', () => {
  const storeWithForm = {
    test: {
      fields: {},
      values: {},
      errors: {},
      initialValues: {},
      touched: {},
      submitted: false,
      valid: true,
      pristine: true,
      canBeValidated: true,
      anyTouched: false,
    },
  };

  const options = {
    formName: 'test',
    options: {
      validate: undefined,
      initialValues: undefined,
      onSubmit: () => {},
      resetAfterSubmit: false,
    },
  };

  const meta = { form: 'test', field: '', setTouchedForAllValues: true };

  it('creates submit action for valid case', () => {
    const expectedActions = [
      { type: SUBMITTING, payload: { meta, payload: { submitted: true } } },
      { type: SUBMITTING, payload: { meta, payload: { submitted: false } } },
    ];

    const store = mockStore({ form: storeWithForm });
    return store.dispatch(submit(doSubmit(options)) as any).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates submit action for invalid case', () => {
    const expectedActions = [
      { type: SUBMITTING, payload: { meta, payload: { submitted: true } } },
      { type: SUBMITTING, payload: { meta, payload: { submitted: false } } },
    ];
    const form = { ...storeWithForm,  test: { ...storeWithForm.test, valid: false } };
    const store = mockStore({ form: form });
    return store.dispatch(submit(doSubmit(options)) as any).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates submit action for invalid case with additional validate', () => {
    const expectedActions = [
      { type: SUBMITTING, payload: { meta, payload: { submitted: true } } },
      { type: SET_VALIDATION, payload: { meta, payload: { email: 'required' } } },
      { type: SUBMITTING, payload: { meta, payload: { submitted: false } } },
    ];
    const form = { ...storeWithForm,  test: { ...storeWithForm.test, valid: false } };

    const validate = () => ({ email: 'required' });
    const opt = { ...options, options: { ...options.options, validate } };
    const store = mockStore({ form: form });
    return store.dispatch(submit(doSubmit(opt)) as any).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates submit action for valid case with additional reset', () => {
    const expectedActions = [
      { type: SUBMITTING, payload: { meta, payload: { submitted: true } } },
      { type: RESET_FORM, payload: { meta, payload: {} } },
      { type: SUBMITTING, payload: { meta, payload: { submitted: false } } },
    ];

    const opt = { ...options, options: { ...options.options, resetAfterSubmit: true } };
    const store = mockStore({ form: storeWithForm });
    return store.dispatch(submit(doSubmit(opt)) as any).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});