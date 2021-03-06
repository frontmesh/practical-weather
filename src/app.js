import { createStackNavigator } from 'react-navigation';
import { MainScreen } from './screens';

const navigationOptions = {
  headerBackTitle: ' ',
  headerTitleStyle: {
    alignSelf: 'center',
  },
};

const stackOptions = {
  initialRouteName: 'Main',
  headerMode: 'screen',
};

export default createStackNavigator(
  {
    Main: { screen: MainScreen, navigationOptions },
  },
  stackOptions
);

// import React, { Component } from 'react';
// import { Platform, Permissions, Text, View } from 'react-native';
// import { Constants, Location } from 'expo';
// import { API_KEY, GEO_API } from 'react-native-dotenv';

// import YQL from './utils/YQL';

// export default class App extends Component {
//   state = {
//     location: null,
//     errorMessage: null,
//   };

//   componentWillMount() {
//     if (Platform.OS === 'android' && !Constants.isDevice) {
//       this.setState({
//         errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
//       });
//     } else {
//       this._getLocationAsync();
//     }

//     const yql = new YQL('SELECT * FROM weather.forecast WHERE (location = @zip)');

//     yql.setParam('zip', 94089)
//       .setConfig('ssl', true)
//       .exec((err, res) => console.log(err, res));
//   }

//   _getLocationAsync = async () => {
//     let { status } = await Permissions.askAsync(Permissions.LOCATION);
//     if (status !== 'granted') {
//       this.setState({
//         errorMessage: 'Permission to access location was denied',
//       });
//     }

//     let location = await Location.getCurrentPositionAsync({});
//     this.setState({ location });
//     const { coords } = location;
//     console.log('coords', coords);
//     fetch(GEO_API + '?latlng=' + coords.latitude + ',' + coords.longitude + '&key=' + API_KEY)
//       .then((response) => response.json())
//       .then((responseJson) => {
//         console.log('ADDRESS GEOCODE is BACK!! => ');
//         console.log(responseJson.results);
//       });
//   };

//   render() {
//     let text = 'Waiting..';
//     if (this.state.errorMessage) {
//       text = this.state.errorMessage;
//     } else if (this.state.location) {
//       text = JSON.stringify(this.state.location);
//     }

//     return (
//       <View>
//         <Text>{text}</Text>
//         <Text>Country: {this.state.countryName}</Text>
//         <Text>City: {this.state.city}</Text>
//       </View>
//     )
//   }
// }