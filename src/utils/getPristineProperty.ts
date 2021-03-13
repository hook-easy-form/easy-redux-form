import { TInitialValues, TValues } from '../types/state.types';

export const getPristineProperty = (
  values: TValues,
  initialValues: TInitialValues
): boolean => {
  return Object.keys(values).reduce((acc, el) => {
    if (!acc) return acc;

    return values[el] === initialValues[el];
  }, true as boolean);
};
