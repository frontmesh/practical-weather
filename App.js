import React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import App from './src/app';

export default class Main extends React.Component {

  render() {
    return (
      <View style={{ height: '100%' }}>
        <StatusBar backgroundColor="#852d91" barStyle="light-content" />
        <App />
      </View>
    );
  }
}
