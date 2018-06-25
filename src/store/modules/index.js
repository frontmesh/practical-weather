import { combineReducers } from 'redux';

import locationReducer from './location';

export default combineReducers({
  location: locationReducer,
});
