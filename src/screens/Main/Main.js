import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Constants, Location, LinearGradient, Permissions } from 'expo';

import { THEME, STYLE } from '../../config';
const {
  COLOR: { BLACK },
  PRIMARY,
} = THEME;

class Main extends Component {
  static navigationOptions = ({
    navigation: {
      navigate,
      state: { params: { backgroundColor = PRIMARY } = {} },
    },
  }) => ({
    headerTransparent: true,
    title: 'Amsterdam',
    headerTintColor: '#fff',
    tintColor: '#FFFFFF',
    headerStyle: {
      backgroundColor,
      elevation: 0,
      borderBottomWidth: 0,
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
  componentWillMount() {
    this.getLocation();
  }

  getLocation = async () => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied',
        });
      }

      let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      this.setState({ location });
    } catch (error) {
      return Promise.reject(error);
    }
  };

  render() {
    return (
      <LinearGradient colors={THEME.GRADIENT} style={STYLE.SCREEN}>
        <Text>Hello</Text>
      </LinearGradient>
    );
  }
}

export default Main;
