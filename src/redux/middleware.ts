import { Middleware } from 'redux';

export const middleware: Middleware = (storeAPI) => (next) => (action) => {
  if (typeof action.payload === 'function') {
    return action.payload(storeAPI.dispatch, storeAPI.getState);
  }
  return next(action);
};