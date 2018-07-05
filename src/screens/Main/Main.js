import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { THEME } from '../../config';
const { COLOR: { BLACK }, PRIMARY } = THEME;

class Main extends Component {
  static navigationOptions = ({
    navigation: { navigate, state: { params: { backgroundColor = PRIMARY } = { } } },
  }) => ({
    headerStyle: {
      backgroundColor,
      elevation: 0,
      shadowColor: 'transparent',
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
      },
    },
  });

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Hello</Text>
      </View>
    );
  }
}

export default Main;
