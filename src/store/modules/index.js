import { AsyncStorage } from 'react-native';
import { persistCombineReducers } from 'redux-persist';

import locationReducer from './location';

const config = {
  key: 'primary',
  storage: AsyncStorage,
};

export default persistCombineReducers(config, {
  location: locationReducer,
});
