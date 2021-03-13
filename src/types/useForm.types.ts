import { TErrors, TInitialValues, TValues } from './state.types';

export type TValidateFunction = (v: TValues) => TErrors;
export type OnSubmit = (v: TValues) => void | Promise<void>;

export interface FormOptions {
  onSubmit: OnSubmit;
  validate?: TValidateFunction;
  initialValues?: TInitialValues;
  resetAfterSubmit?: boolean;
}

export interface FormProps {
  formName: string;
  options: FormOptions;
}
