import { createStackNavigator, createAppContainer } from "react-navigation";

import Main from './screens/Main';
import AddLocation from './screens/AddLocation';

const AppNavigator = createStackNavigator({
  Home: Main,
  AddLocation: AddLocation
},{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: 'transparent',
    },
    headerTintColor: '#ccc',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center'
    },
  },
});


export default createAppContainer(AppNavigator);
