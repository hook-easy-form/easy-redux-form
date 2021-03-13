import {
  INITIALIZE_FORM,
  CHANGE_FIELD,
  ON_BLUR_FIELD,
  INITIALIZE_FIELD,
  DESTROY_FIELD,
  SET_VALIDATION,
  SUBMITTING,
} from './action.types';
import {
  FormActionTypes,
  SetValidationReducer,
  InitializeFormReducer,
  InitializeFieldReducer,
  DestroyFieldReducer,
  ChangeFieldReducer,
  OnBlurFieldReducer,
  SetSubmittedReducer,
} from '../types/redux.types';
import { IFormState } from '../types/state.types';
import { rmFieldsFromObject } from '../utils/rmFieldsFromObject';
import { getPristineProperty } from '../utils/getPristineProperty';
import { getValue } from '../utils/getValue';
import { getValidProperty } from '../utils/getValidProperty';

export const initialState: IFormState = {};

const initializeForm: InitializeFormReducer = (state, p) => {
  const {
    meta: { form },
    payload: { initialValues },
  } = p;

  return {
    ...state,
    [form]: {
      fields: {},
      values: {},
      errors: {},
      initialValues: initialValues || {},
      touched: {},
      submitted: false,
      valid: false,
      pristine: true,
      canBeValidated: true,
    },
  };
};

const initializeField: InitializeFieldReducer = (state, p) => {
  const {
    meta: { form, field },
    payload: { type },
  } = p;

  const value = getValue(state[form].initialValues[field], type);

  return {
    ...state,
    [form]: {
      ...state[form],
      fields: { ...state[form].fields, [field]: true },
      values: { ...state[form].values, [field]: value },
      initialValues: { ...state[form].initialValues, [field]: value },
      errors: { ...state[form].errors, [field]: '' },
      touched: { ...state[form].touched, [field]: false },
      canBeValidated: false,
    },
  };
};

const destroyField: DestroyFieldReducer = (state, p) => {
  const {
    meta: { form, field },
  } = p;

  return {
    ...state,
    [form]: {
      ...state[form],
      fields: rmFieldsFromObject(state[form].fields, [field]),
      values: rmFieldsFromObject(state[form].values, [field]),
      errors: rmFieldsFromObject(state[form].errors, [field]),
      touched: rmFieldsFromObject(state[form].touched, [field]),
      canBeValidated: false,
    },
  };
};

const changeField: ChangeFieldReducer = (state, p) => {
  const {
    meta: { form, field },
    payload: { value },
  } = p;

  const values = {
    ...state[form].values,
    [field]: value,
  };

  return {
    ...state,
    [form]: {
      ...state[form],
      values,
      pristine: getPristineProperty(values, state[form].initialValues),
      canBeValidated: true,
    },
  };
};

const onBlurField: OnBlurFieldReducer = (state, p) => {
  const {
    meta: { form, field },
  } = p;

  return {
    ...state,
    [form]: {
      ...state[form],
      touched: {
        ...state[form].touched,
        [field]: true,
      },
      canBeValidated: false,
    },
  };
};

const setValidation: SetValidationReducer = (state, p) => {
  const {
    meta: { form, setTouchedForAllValues },
    payload,
  } = p;

  const touched = setTouchedForAllValues !== undefined && setTouchedForAllValues !== false
    ? Object.keys(state[form].touched).reduce((a, e) => ({ ...a, [e]: true }), {})
    : state[form].touched;

  return {
    ...state,
    [form]: {
      ...state[form],
      errors: payload,
      valid: getValidProperty(payload),
      touched,
    },
  };
};

const submit: SetSubmittedReducer = (state, p) => {
  const {
    meta: { form },
    payload: { submitted },
  } = p;
  // TODO finish this action
  return {
    ...state,
    [form]: {
      ...state[form],
      submitted,
    },
  };
};

export default function formReducer(
  state: IFormState = initialState,
  action: FormActionTypes,
): IFormState {
  switch (action.type) {
    case INITIALIZE_FORM:
      return initializeForm(state, action.payload);

    case INITIALIZE_FIELD:
      return initializeField(state, action.payload);

    case DESTROY_FIELD:
      return destroyField(state, action.payload);

    case CHANGE_FIELD:
      return changeField(state, action.payload);

    case ON_BLUR_FIELD:
      return onBlurField(state, action.payload);

    case SET_VALIDATION:
      return setValidation(state, action.payload);

    case SUBMITTING:
      return submit(state, action.payload);

    default: {
      return state;
    }
  }
}
