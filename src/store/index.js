import { AsyncStorage } from 'react-native';
import { compose, createStore } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import { reducers } from './modules';

export default () => {
  return new Promise(resolve => {
    const store = createStore(
      reducers,
      compose(autoRehydrate()),
    );

    persistStore(
      store,
      {
        storage: AsyncStorage,
      },
      () => resolve(store)
    );
  });
};
