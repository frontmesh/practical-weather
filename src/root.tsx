import { createStackNavigator, createAppContainer } from "react-navigation";

import Main from './screens/main';

const AppNavigator = createStackNavigator({
  Home: {
    screen: Main
  }
});


export default createAppContainer(AppNavigator);
