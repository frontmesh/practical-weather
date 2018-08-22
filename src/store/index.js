import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import reducers from './modules';

export default () => {
  const store = createStore(reducers, undefined);
  const persistor = persistStore(store, null, () => store.getState());
  return { store, persistor };
};
