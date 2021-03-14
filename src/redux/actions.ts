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
} from './action.types';
import {
  inferLiteral,
  ChangeFieldPayload,
  InitializeFormPayload,
  OnBlurFieldPayload,
  InitializeFieldPayload,
  DestroyFieldPayload,
  SetValidationPayload,
  SubmittingPayload,
  ResetPayload,
  SubmitPayload,
} from '../types/redux.types';

export const initializeForm = (payload: InitializeFormPayload) =>
  ({
    type: inferLiteral(INITIALIZE_FORM),
    payload,
  } as const);

export const initializeField = (payload: InitializeFieldPayload) =>
  ({
    type: inferLiteral(INITIALIZE_FIELD),
    payload,
  } as const);

export const destroyField = (payload: DestroyFieldPayload) =>
  ({
    type: inferLiteral(DESTROY_FIELD),
    payload,
  } as const);

export const changeField = (payload: ChangeFieldPayload) =>
  ({
    type: inferLiteral(CHANGE_FIELD),
    payload,
  } as const);

export const onBlurField = (payload: OnBlurFieldPayload) =>
  ({
    type: inferLiteral(ON_BLUR_FIELD),
    payload,
  } as const);

export const setValidation = (payload: SetValidationPayload) =>
  ({
    type: inferLiteral(SET_VALIDATION),
    payload,
  } as const);

export const submitting = (payload: SubmittingPayload) =>
  ({
    type: inferLiteral(SUBMITTING),
    payload,
  } as const);

export const resetForm = (payload: ResetPayload) =>
  ({
    type: inferLiteral(RESET_FORM),
    payload,
  } as const);

export const submit = (payload: SubmitPayload) =>
  ({
    type: inferLiteral(SUBMIT),
    payload,
  } as const);
