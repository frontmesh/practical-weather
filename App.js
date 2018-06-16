import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from  './src/store';
import { LoadingScreen } from './src/screens';
import App from './src/app';

export default class Main extends Component {

  async componentWillMount() {
    this.setState({ store: await configureStore() });
  }

  render() {
    const { store } = this.state;

    return (
      <View style={{ height: '100%' }}>
        <StatusBar backgroundColor="#852d91" barStyle="light-content" />
        {!store ? <LoadingScreen /> : <Provider store={this.state.store}>
          <App />
        </Provider>}
      </View>
    );
  }
}
