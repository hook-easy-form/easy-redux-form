import { Middleware } from 'redux';

export const middleware: Middleware = (storeAPI) => (next) => (
  action
) => {
  if (typeof action === 'function') {
    return action(storeAPI.dispatch, storeAPI.getState);
  }
  return next(action);
};