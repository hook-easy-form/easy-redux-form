import {
  changeField,
  onBlurField,
  destroyField,
  initializeField,
  initializeForm,
  resetForm,
  setValidation,
  submitting,
  submit,
  updateInitialValues,
} from './actions';
import {
  INITIALIZE_FORM,
  CHANGE_FIELD,
  ON_BLUR_FIELD,
  INITIALIZE_FIELD,
  DESTROY_FIELD,
  SET_VALIDATION,
  SUBMITTING,
  RESET_FORM,
  SUBMIT,
  UPDATE_INITIAL_VALUES,
} from './action.types';

describe('form actions', () => {

  const initialMeta = { form: 'test' };

  it('should create an action - changeField', () => {
    const payload = {
      meta: { ...initialMeta, field: 'email' },
      payload: { value: 'test@test.com' },
    };
    const expectedAction = { type: CHANGE_FIELD, payload };
    expect(changeField(payload)).toEqual(expectedAction);
  });

  it('should create an action - onBlurField', () => {
    const payload = {
      meta: { ...initialMeta, field: 'email' },
      payload: {},
    };
    const expectedAction = { type: ON_BLUR_FIELD, payload };
    expect(onBlurField(payload)).toEqual(expectedAction);
  });

  it('should create an action - destroyField', () => {
    const payload = {
      meta: { ...initialMeta, field: 'email' },
      payload: {},
    };
    const expectedAction = { type: DESTROY_FIELD, payload };
    expect(destroyField(payload)).toEqual(expectedAction);
  });

  it('should create an action - initializeField', () => {
    const payload = {
      meta: { ...initialMeta, field: 'email' },
      payload: {},
    };
    const expectedAction = { type: INITIALIZE_FIELD, payload };
    expect(initializeField(payload)).toEqual(expectedAction);
  });

  it('should create an action - initializeForm', () => {
    const payload = {
      meta: initialMeta,
      payload: {},
    };
    const expectedAction = { type: INITIALIZE_FORM, payload };
    expect(initializeForm(payload)).toEqual(expectedAction);
  });

  it('should create an action - resetForm', () => {
    const payload = {
      meta: initialMeta,
      payload: {},
    };
    const expectedAction = { type: RESET_FORM, payload };
    expect(resetForm(payload)).toEqual(expectedAction);
  });

  it('should create an action - setValidation', () => {
    const payload = {
      meta: initialMeta,
      payload: { email: 'required' },
    };
    const expectedAction = { type: SET_VALIDATION, payload };
    expect(setValidation(payload)).toEqual(expectedAction);
  });

  it('should create an action - submitting', () => {
    const payload = {
      meta: initialMeta,
      payload: { submitted: true },
    };
    const expectedAction = { type: SUBMITTING, payload };
    expect(submitting(payload)).toEqual(expectedAction);
  });

  it('should create an action - submit', () => {
    const payload = () => {};
    const expectedAction = { type: SUBMIT, payload };
    expect(submit(payload as any)).toEqual(expectedAction);
  });

  it('should create an action - updateInitialValues', () => {
    const payload = { meta: initialMeta, payload: { initialValues: { email: 'some@some.com' }} };
    const expectedAction = { type: UPDATE_INITIAL_VALUES, payload };
    expect(updateInitialValues(payload)).toEqual(expectedAction);
  });
});