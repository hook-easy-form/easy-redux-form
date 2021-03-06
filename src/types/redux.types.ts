import * as actions from '../redux/actions';
import { DispatchAsync } from '../redux/async.action';
import { IFormState, TErrors, TInitialValues } from './state.types';
import { FieldOptions } from './useField.types';

type inferValueType<T> = T extends { [key: string]: infer U } ? U : never;
const iL = <U, T extends U>(arg: T): T => arg;
export const inferLiteral = <T extends string>(arg: T): T => iL(arg);
export type FormActionTypes = ReturnType<inferValueType<typeof actions>>;

export type SubmitPayload = DispatchAsync;

type Payload<T> = {
  meta: {
    form: string;
    field?: string;
    setTouchedForAllValues?: boolean;
  };
  payload: T;
};

// payloads
export type InitializeFormPayload = Payload<{ initialValues?: TInitialValues }>;
export type InitializeFieldPayload = Payload<FieldOptions>;
export type DestroyFieldPayload = Payload<Record<string, never>>;
export type ChangeFieldPayload = Payload<{ value: any, touched?: boolean; }>;
export type OnBlurFieldPayload = Payload<Record<string, never>>;
export type SetValidationPayload = Payload<TErrors>;
export type SubmittingPayload = Payload<{ submitted: boolean }>;
export type ResetPayload = Payload<Record<string, never>>;
export type UpdateInitialValuesPayload = Payload<{ initialValues: TInitialValues }>;

// actions
type Action<T> = (p: T) => FormActionTypes;
export type InitializeFormAction = Action<InitializeFormPayload>;
export type InitializeFieldAction = Action<InitializeFieldPayload>;
export type DestroyFieldAction = Action<DestroyFieldPayload>;
export type ChangeFieldAction = Action<ChangeFieldPayload>;
export type OnBlurFieldAction = Action<OnBlurFieldPayload>;
export type SetValidationAction = Action<SetValidationPayload>;
export type SetSubmittedAction = Action<SubmittingPayload>;
export type ResetFormAction = Action<ResetPayload>;
export type UpdateInitialValuesAction = Action<UpdateInitialValuesPayload>;

// reducers
type Reducer<T> = (s: IFormState, p: T) => IFormState;
export type InitializeFormReducer = Reducer<InitializeFormPayload>;
export type InitializeFieldReducer = Reducer<InitializeFieldPayload>;
export type DestroyFieldReducer = Reducer<DestroyFieldPayload>;
export type ChangeFieldReducer = Reducer<ChangeFieldPayload>;
export type OnBlurFieldReducer = Reducer<OnBlurFieldPayload>;
export type SetValidationReducer = Reducer<SetValidationPayload>;
export type SetSubmittedReducer = Reducer<SubmittingPayload>;
export type ResetFormReducer = Reducer<ResetPayload>;
export type UpdateInitialValuesReducer = Reducer<UpdateInitialValuesPayload>;
