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
import {
  FormActionTypes,
  SetValidationReducer,
  InitializeFormReducer,
  InitializeFieldReducer,
  DestroyFieldReducer,
  ChangeFieldReducer,
  OnBlurFieldReducer,
  SetSubmittedReducer,
  ResetFormReducer,
} from '../types/redux.types';
import { IFormState } from '../types/state.types';
import { rmFieldsFromObject } from '../utils/rmFieldsFromObject';
import { getPristineProperty } from '../utils/getPristineProperty';
import { getValue } from '../utils/getValue';
import { getValidProperty } from '../utils/getValidProperty';
import { changeAllTouchedProperties } from '../utils/changeAllTouchedProperties';
import { resetAllErrorsProperty } from '../utils/resetAllErrorsProperty';

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
      anyTouched: false,
    },
  };
};

const initializeField: InitializeFieldReducer = (state, p) => {
  const {
    meta: { form, field },
    payload: { type },
  } = p;

  if (!field) return state;

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

  if (!field) return state;

  return {
    ...state,
    [form]: {
      ...state[form],
      fields: rmFieldsFromObject(state[form].fields, [field]),
      values: rmFieldsFromObject(state[form].values, [field]),
      errors: rmFieldsFromObject(state[form].errors, [field]),
      touched: rmFieldsFromObject(state[form].touched, [field]),
    },
  };
};

const changeField: ChangeFieldReducer = (state, p) => {
  const {
    meta: { form, field },
    payload: { value, touched },
  } = p;

  
  if (!field) return state;
  
  const values = {
    ...state[form].values,
    [field]: value,
  };

  const shouldCheckTouched = touched !== undefined && touched !== false;

  if (shouldCheckTouched) {
    return {
      ...state,
      [form]: {
        ...state[form],
        values,
        touched: { ...state[form].touched, [field]: true },
        pristine: getPristineProperty(values, state[form].initialValues),
        canBeValidated: true,
        anyTouched: true,
      },
    };
  }

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

  if (!field) return state;

  return {
    ...state,
    [form]: {
      ...state[form],
      touched: {
        ...state[form].touched,
        [field]: true,
      },
      anyTouched: true,
    },
  };
};

const setValidation: SetValidationReducer = (state, p) => {
  const {
    meta: { form, setTouchedForAllValues },
    payload,
  } = p;

  const shouldCheckTouched = setTouchedForAllValues !== undefined && setTouchedForAllValues !== false;

  if (shouldCheckTouched) {
    const touched = changeAllTouchedProperties(state[form].touched, true);

    return {
      ...state,
      [form]: {
        ...state[form],
        errors: payload,
        valid: getValidProperty(payload),
        touched,
        anyTouched: true,
      },
    };
  }

  return {
    ...state,
    [form]: {
      ...state[form],
      errors: payload,
      valid: getValidProperty(payload),
    },
  };
};

const submit: SetSubmittedReducer = (state, p) => {
  const {
    meta: { form },
    payload: { submitted },
  } = p;

  return {
    ...state,
    [form]: {
      ...state[form],
      submitted,
    },
  };
};

const resetForm: ResetFormReducer = (state, p) => {
  const {
    meta: { form },
  } = p;

  const touched = changeAllTouchedProperties(state[form].touched, false);
  const errors = resetAllErrorsProperty(state[form].errors);

  return {
    ...state,
    [form]: {
      ...state[form],
      values: state[form].initialValues,
      errors,
      touched,
      submitted: false,
      valid: false,
      pristine: true,
      canBeValidated: false,
      anyTouched: false,
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

    case RESET_FORM:
      return resetForm(state, action.payload);

    default: {
      return state;
    }
  }
}
