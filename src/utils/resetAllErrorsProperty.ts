export const resetAllErrorsProperty = <T>(object: T): T => {
  return Object.keys(object).reduce((a, e) => ({ ...a, [e]: '' }), {} as T);
};