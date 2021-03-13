import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import { initialStore } from './initial-state';
import rootReducer from './reducer';

// LIB 
import { formMiddleware } from '../../lib';

const logger = createLogger({ collapsed: true });

const middleWares = [logger, formMiddleware];

export default createStore(
  rootReducer,
  initialStore,
  applyMiddleware(...middleWares),
);
