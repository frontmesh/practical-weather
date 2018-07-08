import React, { Component } from 'react';
import { View, Text, Permissions } from 'react-native';
import { Constants, Location } from 'expo';

import { THEME } from '../../config';
const { COLOR: { BLACK }, PRIMARY } = THEME;

class Main extends Component {
  static navigationOptions = ({
    navigation: { navigate, state: { params: { backgroundColor = PRIMARY } = { } } },
  }) => ({
    headerTransparent: true,
    title: 'Blabla',
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
    this.state = {
      location: null,
      errorMessage: null,
    };
  }

  getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
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
