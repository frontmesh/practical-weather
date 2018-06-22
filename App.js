import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/store';
import { LoadingScreen } from './src/screens/';
import App from './src/app';
import { THEME } from './src/config';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      store: undefined,
    };
  }

  async componentWillMount() {
    this.setState({
      store: await configureStore(),
    });
  }

  render() {
    const { store } = this.state;

    return (
      <View style={{ height: '100%' }}>
        <StatusBar animated backgroundColor={THEME.COLOR.PRIMARY} barStyle="light-content" />
        {!store ? (
          <LoadingScreen />
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
