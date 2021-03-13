import * as actions from './redux/actions';
import { middleware as formMiddleware } from './redux/middleware';

export { default as reducer } from './redux/reducer';
export { default as useFromRedux } from './hooks/useFormRedux';
export { default as useField } from './hooks/useField';

export { formMiddleware };

export const changeField = actions.changeField;
export const onBlurField = actions.onBlurField;
export const destroyField = actions.destroyField;
export const initializeField = actions.initializeField;
export const initializeForm = actions.initializeForm;
export const resetForm = actions.resetForm;
export const setValidation = actions.setValidation;
export const submitting = actions.submitting;
