import React, { Component } from 'react';
import { Asset, AppLoading } from 'expo';
import { StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/store';
import { LoadingScreen } from './src/screens/';
import App from './src/app';
import { THEME, ASSET } from './src/config';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      store: undefined,
      isReady: false,
    };
  }

  async loadStore() {
    this.setState({
      store: await configureStore(),
    });
  }

  async _cacheResourcesAsync() {
    const { logoList } = ASSET;
    return Promise.all(
      logoList.map(img => Asset.fromModule(img).downloadAsync()),
      this.loadStore()
    );
  }

  render() {
    const { store, isReady } = this.state;

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
            <App />
          </Provider>
        )}
      </View>
    );
  }
}

export default Main;
