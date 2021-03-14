import {
  INITIALIZE_FORM,
  CHANGE_FIELD,
  ON_BLUR_FIELD,
  INITIALIZE_FIELD,
  DESTROY_FIELD,
  SET_VALIDATION,
  SUBMITTING,
  RESET_FORM,
} from './action.types';
import formReducer from './reducer';
import { inferLiteral } from '../types/redux.types';
import { rmFieldsFromObject } from '../utils/rmFieldsFromObject';
import { getPristineProperty } from '../utils/getPristineProperty';
import { getValidProperty } from '../utils/getValidProperty';



describe('form reducer', () => {

  const initialStore = {};
  const storeWithForm = {
    test: {
      fields: {},
      values: {},
      errors: {},
      initialValues: {},
      touched: {},
      submitted: false,
      valid: false,
      pristine: true,
      canBeValidated: true,
      anyTouched: false,
    },
  };
  const initialMeta = { form: 'test' };

  it('should handle INITIALIZE_FORM', () => {
    const action = {
      type: inferLiteral(INITIALIZE_FORM),
      payload: { meta: initialMeta, payload: {} },
    };

    expect(formReducer(initialStore, action)).toEqual(storeWithForm);
  });

  it('should handle INITIALIZE_FIELD without passing field property', () => {
    const action = {
      type: inferLiteral(INITIALIZE_FIELD),
      payload: { meta: { ...initialMeta }, payload: {} },
    };

    expect(formReducer(initialStore, action)).toEqual(initialStore);
  });

  it('should handle INITIALIZE_FIELD', () => {
    const action = {
      type: inferLiteral(INITIALIZE_FIELD),
      payload: { meta: { ...initialMeta, field: 'email' }, payload: {} },
    };

    const { form, field } = action.payload.meta;
    
    const result = {
      ...storeWithForm,
      [form]: {
        ...storeWithForm[form as 'test'],
        fields: { ...storeWithForm[form as 'test'].fields, [field]: true },
        values: { ...storeWithForm[form as 'test'].values, [field]: '' },
        initialValues: { ...storeWithForm[form as 'test'].initialValues, [field]: '' },
        errors: { ...storeWithForm[form as 'test'].errors, [field]: '' },
        touched: { ...storeWithForm[form as 'test'].touched, [field]: false },
        canBeValidated: false,
      },
    };

    expect(formReducer(storeWithForm, action)).toEqual(result);
  });

  it('should handle DESTROY_FIELD without passing field property', () => {
    const action = {
      type: inferLiteral(DESTROY_FIELD),
      payload: { meta: { ...initialMeta }, payload: {} },
    };

    expect(formReducer(storeWithForm, action)).toEqual(storeWithForm);
  });

  it('should handle DESTROY_FIELD', () => {
    const action = {
      type: inferLiteral(DESTROY_FIELD),
      payload: { meta: { ...initialMeta, field: 'email' }, payload: {} },
    };

    const { form, field } = action.payload.meta;
    const result = {
      ...storeWithForm,
      [form]: {
        ...storeWithForm[form as 'test'],
        fields: rmFieldsFromObject(storeWithForm[form as 'test'].fields, [field]),
        values: rmFieldsFromObject(storeWithForm[form as 'test'].values, [field]),
        errors: rmFieldsFromObject(storeWithForm[form as 'test'].errors, [field]),
        touched: rmFieldsFromObject(storeWithForm[form as 'test'].touched, [field]),
      },
    };

    expect(formReducer(storeWithForm, action)).toEqual(result);
  });

  it('should handle CHANGE_FIELD without passing field property', () => {
    const action = {
      type: inferLiteral(CHANGE_FIELD),
      payload: { meta: { ...initialMeta }, payload: { value: 'some v' } },
    };

    expect(formReducer(storeWithForm, action)).toEqual(storeWithForm);
  });

  it('should handle CHANGE_FIELD', () => {
    const v = 'some v';
    const action = {
      type: inferLiteral(CHANGE_FIELD),
      payload: { meta: { ...initialMeta, field: 'email' }, payload: { value: v, touched: false } },
    };

    const { form, field } = action.payload.meta;

    const values = {
      ...storeWithForm[form as 'test'].values,
      [field]: v,
    };

    const result = {
      ...storeWithForm,
      [form]: {
        ...storeWithForm[form as 'test'],
        values,
        pristine: getPristineProperty(values, storeWithForm[form as 'test'].initialValues),
        canBeValidated: true,
      },
    };

    expect(formReducer(storeWithForm, action)).toEqual(result);
  });

  it('should handle CHANGE_FIELD with touched property', () => {
    const v = 'some v';
    const action = {
      type: inferLiteral(CHANGE_FIELD),
      payload: { meta: { ...initialMeta, field: 'email' }, payload: { value: v, touched: true } },
    };

    const { form, field } = action.payload.meta;

    const values = {
      ...storeWithForm[form as 'test'].values,
      [field]: v,
    };

    const result = {
      ...storeWithForm,
      [form]: {
        ...storeWithForm[form as 'test'],
        values,
        pristine: getPristineProperty(values, storeWithForm[form as 'test'].initialValues),
        canBeValidated: true,
        anyTouched: true,
        touched: { ...storeWithForm[form as 'test'].touched, [field]: true },
      },
    };

    expect(formReducer(storeWithForm, action)).toEqual(result);
  });

  it('should handle ON_BLUR_FIELD without passing field property', () => {
    const action = {
      type: inferLiteral(ON_BLUR_FIELD),
      payload: { meta: { ...initialMeta }, payload: {} },
    };

    expect(formReducer(storeWithForm, action)).toEqual(storeWithForm);
  });

  it('should handle ON_BLUR_FIELD', () => {
    const action = {
      type: inferLiteral(ON_BLUR_FIELD),
      payload: { meta: { ...initialMeta, field: 'email' }, payload: {} },
    };

    const { form, field } = action.payload.meta;

    const result = {
      ...storeWithForm,
      [form]: {
        ...storeWithForm[form as 'test'],
        touched: {
          ...storeWithForm[form as 'test'].touched,
          [field]: true,
        },
        anyTouched: true,
      },
    };

    expect(formReducer(storeWithForm, action)).toEqual(result);
  });

  it('should handle SET_VALIDATION', () => {
    const action = {
      type: inferLiteral(SET_VALIDATION),
      payload: { meta: { ...initialMeta }, payload: { email: 'required' } },
    };

    const { form } = action.payload.meta;

    const result = {
      ...storeWithForm,
      [form]: {
        ...storeWithForm[form as 'test'],
        errors: action.payload.payload,
        valid: getValidProperty(action.payload.payload),
      },
    };

    expect(formReducer(storeWithForm, action)).toEqual(result);
  });

  it('should handle SET_VALIDATION with setTouchedForAllValues property', () => {
    const action = {
      type: inferLiteral(SET_VALIDATION),
      payload: { meta: { ...initialMeta, setTouchedForAllValues: true }, payload: { email: 'required' } },
    };

    const { form } = action.payload.meta;

    const result = {
      ...storeWithForm,
      [form]: {
        ...storeWithForm[form as 'test'],
        errors: action.payload.payload,
        valid: getValidProperty(action.payload.payload),
        touched: Object.keys(storeWithForm[form as 'test'].touched).reduce((a, e) => ({ ...a, [e]: true }), {}),
        anyTouched: true,
      },
    };

    expect(formReducer(storeWithForm, action)).toEqual(result);
  });

  it('should handle SUBMITTING', () => {
    const action = {
      type: inferLiteral(SUBMITTING),
      payload: { meta: { ...initialMeta }, payload: { submitted: true } },
    };

    const { form } = action.payload.meta;

    const result = {
      ...storeWithForm,
      [form]: {
        ...storeWithForm[form as 'test'],
        submitted: true,
      },
    };

    expect(formReducer(storeWithForm, action)).toEqual(result);
  });

  it('should handle RESET_FORM', () => {
    const action = {
      type: inferLiteral(RESET_FORM),
      payload: { meta: { ...initialMeta }, payload: {} },
    };

    const { form } = action.payload.meta;

    const touched = Object.keys(storeWithForm[form as 'test'].touched).reduce((a, e) => ({ ...a, [e]: false }), {});
    const errors = Object.keys(storeWithForm[form as 'test'].errors).reduce((a, e) => ({ ...a, [e]: '' }), {});

    const result = {
      ...storeWithForm,
      [form]: {
        ...storeWithForm[form as 'test'],
        values: storeWithForm[form as 'test'].initialValues,
        errors,
        touched,
        submitted: false,
        valid: false,
        pristine: true,
        canBeValidated: false,
        anyTouched: false,
      },
    };

    expect(formReducer(storeWithForm, action)).toEqual(result);
  });

  it('should handle default state', () => {
    expect(formReducer(storeWithForm, {} as any)).toEqual(storeWithForm);
  });

  it('should handle undefined state', () => {
    expect(formReducer(undefined, {} as any)).toEqual({});
  });
});
