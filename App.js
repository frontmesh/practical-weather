import React, { Component } from 'react';
import { Asset, AppLoading } from 'expo';
import { StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './src/store';
import { LoadingScreen } from './src/screens/';
import App from './src/app';
import { THEME, ASSET } from './src/config';

class Main extends Component {
  constructor(props) {
    super(props);

    const { store, persistor } = configureStore();
    this.state = {
      store,
      persistor,
      isReady: false,
    };
  }

  async _cacheResourcesAsync() {
    try {
      const { logoList } = ASSET;
      return Promise.all(logoList.map(img => Asset.fromModule(img).downloadAsync()));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  render() {
    const { store, persistor, isReady } = this.state;

    return (
      <View style={{ height: '100%' }}>
        <StatusBar animated backgroundColor={THEME.COLOR.PRIMARY} barStyle="light-content" />
        {!isReady ? (
          <AppLoading
            startAsync={this._cacheResourcesAsync}
            onFinish={() => this.setState({ isReady: true })}
            onError={console.warn}>
            <LoadingScreen />
          </AppLoading>
        ) : (
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <App />
            </PersistGate>
          </Provider>
        )}
      </View>
    );
  }
}

export default Main;
