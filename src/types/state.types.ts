export type TFields = Record<string, boolean>;
export type TValues = Record<string, any>;
export type TInitialValues = Record<string, any>;
export type TErrors = Record<string, string>;
export type TTouched = Record<string, boolean>;

export type IFormState = {
  [key in string]: {
    fields: TFields;
    values: TValues;
    initialValues: TInitialValues;
    errors: TErrors;
    touched: TTouched;
    submitted: boolean;
    valid: boolean;
    pristine: boolean;
  };
};

export type IState = {
  form: IFormState;
};
