import { combineReducers } from 'redux';

// LIB 
import { reducer } from '../../lib';

const appReducer = combineReducers({
  form: reducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
