export const changeAllTouchedProperties = <T>(object: T, value: boolean): T => {
  return Object.keys(object).reduce((a, e) => ({ ...a, [e]: value }), {} as T);
};
