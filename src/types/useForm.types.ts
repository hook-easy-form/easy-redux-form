import { TErrors, TInitialValues, TValues } from './state.types';

export type TValidateFunction = (v: TValues) => TErrors;
export type OnSubmit = (v: TValues) => void | Promise<void>;

export interface FormOptions {
  validate?: TValidateFunction;
  initialValues?: TInitialValues;
  onSubmit: OnSubmit;
}

export interface FormProps {
  formName: string;
  options: FormOptions;
}
