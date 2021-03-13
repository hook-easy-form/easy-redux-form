import { TErrors } from '../types/state.types';

export const getValidProperty = (errors: TErrors): boolean => {
  return Object.keys(errors).reduce((acc, el) => {
    if (!acc) return acc;

    return errors[el] ? false : true;
  }, true as boolean);
};
